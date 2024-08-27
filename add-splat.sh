#!/bin/bash

# Check if a file path is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <path_to_splat_file>"
    exit 1
fi

# Get the file path
file_path="$1"

# Check if the file exists
if [ ! -f "$file_path" ]; then
    echo "Error: File does not exist."
    exit 1
fi

# Check if the file is a .splat file
if [[ "$file_path" != *.splat ]]; then
    echo "Error: File must have a .splat extension."
    exit 1
fi

# Copy the file to the public/splats directory
mkdir -p public/splats
cp "$file_path" public/splats/

# Add the file to Git LFS
git lfs track "public/splats/$(basename "$file_path")"

# Add and commit the file
git add "public/splats/$(basename "$file_path")"
git add .gitattributes
git commit -m "Add new splat file: $(basename "$file_path")"

echo "Splat file added successfully!"
