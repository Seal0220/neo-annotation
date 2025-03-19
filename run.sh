#!/bin/bash

echo "Starting the Node.js server..."

script_dir="$(dirname "$0")"
cd $script_dir

# 定義功能函數
install_dependencies() {
    echo "Installing dependencies..."
    npm cache clean --force
    npm install
}

build_app() {
    echo "Building Next app..."
    npm run build
}

start_screen_session() {
    echo "Launching the application in a screen session..."
    screen -dmS neo-annotation npm run start
    echo "Node.js server is running in a screen session!"
}

stop_screen_session() {
    echo "Stopping the screen session..."
    screen -S neo-annotation -X quit
    echo "Screen session stopped."
}

update_app() {
    echo "Updating..."
    git pull origin main
    install_dependencies
    echo "Updated"
}

# 處理不同的參數
case "$1" in
    --screen)
        # install_dependencies
        # build_app
        start_screen_session
        ;;
    --off)
        stop_screen_session
        ;;
    --dev)
        install_dependencies
        echo "Launching the application in dev mode..."
        npm run dev
        echo "Node.js server is running!"
        ;;
    --update)
        update_app
        ;;
    --auto)
        echo "Executing --auto: update, stop screen, and start screen."
        update_app
        stop_screen_session
        # build_app
        start_screen_session
        ;;
    *)
        install_dependencies
        # build_app
        echo "Launching the application..."
        npm run start
        echo "Node.js server is running!"
        ;;
esac
