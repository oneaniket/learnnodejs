#!/usr/bin/env bash
#
# build-pdf.sh
# Convert every module README.md (and the root README) into a PDF
# inside the pdf/ folder.
#
# Requirements: `npm install` first (installs md-to-pdf, which bundles a
# headless Chromium used to render the markdown to PDF).
#
set -euo pipefail

OUT_DIR="pdf"
mkdir -p "$OUT_DIR"

# List of markdown files to convert, in course order.
# Each entry: "source_markdown|output_pdf_name"
FILES=(
  "README.md|00-course-overview.pdf"
  "00-setup/README.md|00-setup.pdf"
  "01-node-fundamentals/README.md|01-node-fundamentals.pdf"
  "02-http-express/README.md|02-http-express.pdf"
  "03-mongodb-models/README.md|03-mongodb-models.pdf"
  "04-crud-mvc/README.md|04-crud-mvc.pdf"
  "05-typescript/README.md|05-typescript.pdf"
  "06-react-hello/README.md|06-react-hello.pdf"
  "07-react-data-css/README.md|07-react-data-css.pdf"
  "08-react-forms/README.md|08-react-forms.pdf"
  "09-fullstack/README.md|09-fullstack.pdf"
)

for entry in "${FILES[@]}"; do
  src="${entry%%|*}"     # part before "|"
  out="${entry##*|}"     # part after  "|"
  if [[ -f "$src" ]]; then
    echo "Converting $src -> $OUT_DIR/$out"
    # md-to-pdf writes <name>.pdf next to the source; we then move it.
    npx --yes md-to-pdf "$src"
    mv "${src%.md}.pdf" "$OUT_DIR/$out"
  else
    echo "SKIP (missing): $src"
  fi
done

echo "Done. PDFs are in $OUT_DIR/"
