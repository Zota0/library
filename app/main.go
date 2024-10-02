package main

import webview "github.com/webview/webview_go"

func main() {
	debug := true
	w := webview.New(debug)
	defer w.Destroy()
	w.SetTitle("WebView App")
	w.SetSize(1280, 720, webview.HintNone)
	w.Navigate("http://localhost:3000")
	w.Run()
}
