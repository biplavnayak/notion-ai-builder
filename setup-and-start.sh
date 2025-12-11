#!/bin/bash

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Navigate to project directory
cd "/Users/bijaynayak/Documents/SAAS/03 Notion Template Builder/notion-builder"

# Install dependencies
echo "Installing dependencies..."
npm install

# Start the server
echo "Starting development server..."
npm run dev
