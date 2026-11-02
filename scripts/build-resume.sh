#!/bin/sh
# Builds public/resume.pdf from resume/resume.tex.
#
# The resume needs pdfLaTeX, because the XeTeX engines change its fonts. Workers
# Builds has no TeX, so this script installs TeX Live for the current user. The
# 2025 repository is frozen, so packages cannot change between builds. A failed
# step fails the deploy, because no PDF is committed.
set -eu

texlive_year=2025
repository="https://ftp.math.utah.edu/pub/tex/historic/systems/texlive/$texlive_year/tlnet-final"
packages='academicons amsfonts cm cm-super cjk ec enumitem etoolbox fancyhdr fontawesome graphics
	hyperref latex latex-bin latex-fonts marvosym preprint psnfss titlesec tools url wasy wasysym xcolor'

root=$(CDPATH='' cd -- "$(dirname -- "$0")/.." && pwd)
install_dir="${TEXLIVE_HOME:-$root/node_modules/.cache/texlive/$texlive_year}"

find_tex_bin() {
	find "$install_dir/bin" -mindepth 1 -maxdepth 1 -type d 2>/dev/null | head -n 1
}

# An interrupted install can leave pdflatex without all packages, so only this
# marker proves that the cache is complete.
complete_marker="$install_dir/.complete"

if [ ! -f "$complete_marker" ]; then
	echo "Installing TeX Live $texlive_year into $install_dir"
	rm -rf "$install_dir"
	mkdir -p "$install_dir"
	work_dir=$(mktemp -d)

	curl --fail --silent --show-error --location --retry 3 \
		"$repository/install-tl-unx.tar.gz" | tar -xz -C "$work_dir" --strip-components=1

	cat >"$work_dir/profile" <<PROFILE
selected_scheme scheme-infraonly
TEXDIR $install_dir
TEXMFLOCAL $install_dir/texmf-local
TEXMFSYSCONFIG $install_dir/texmf-config
TEXMFSYSVAR $install_dir/texmf-var
TEXMFHOME $install_dir/texmf-home
TEXMFCONFIG $install_dir/texmf-config
TEXMFVAR $install_dir/texmf-var
tlpdbopt_install_docfiles 0
tlpdbopt_install_srcfiles 0
PROFILE

	"$work_dir/install-tl" --no-interaction --repository "$repository" \
		--profile "$work_dir/profile" >"$work_dir/install.log" 2>&1 || {
		tail -n 40 "$work_dir/install.log" >&2
		exit 1
	}
	# shellcheck disable=SC2086 # The list must split into package names.
	"$(find_tex_bin)/tlmgr" install $packages
	touch "$complete_marker"
	rm -rf "$work_dir"
fi

# pdfTeX hashes the output path into the PDF ID, so this path must stay fixed.
build_dir="$root/node_modules/.cache/resume-build"
rm -rf "$build_dir"
mkdir -p "$build_dir"

# A fixed date keeps two builds of the same source byte-identical.
SOURCE_DATE_EPOCH=$(git -C "$root" log -1 --format=%ct -- resume/resume.tex 2>/dev/null || true)
export SOURCE_DATE_EPOCH="${SOURCE_DATE_EPOCH:-0}"
export FORCE_SOURCE_DATE=1

# hyperref needs a second pass to settle its link targets.
for _ in 1 2; do
	(cd "$root/resume" && "$(find_tex_bin)/pdflatex" -interaction=batchmode \
		-halt-on-error -output-directory "$build_dir" resume.tex >/dev/null) || {
		tail -n 40 "$build_dir/resume.log" >&2
		exit 1
	}
done

mkdir -p "$root/public"
mv "$build_dir/resume.pdf" "$root/public/resume.pdf"
echo 'Built public/resume.pdf'
