#!/bin/bash

# Check if no arguments were provided
if [ $# -eq 0 ]; then
    echo "No arguments supplied"
    exit 1
fi

# Loop through all arguments
for arg in "$@"
do
    dir="ex$arg"
    mkdir -p "$dir"
done
