#!/bin/bash

mkdir -p .github/workflows

cat << EOF > .github/workflows/deploy.yml
name: Deploy Next.js site to Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

env:
  NEXT_PUBLIC_BASE_PATH: ''

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install

      - name: Build and Export
        run: bun run build && bun run export

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: gh-pages
          folder: out
          token: \${{ secrets.GITHUB_TOKEN }}
EOF

echo "GitHub Actions workflow created!"
