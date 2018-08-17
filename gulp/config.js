"use strict";

/* Modules used within the application */
require('dotenv').config();

const connect = require("browser-sync"); // Plugin to keep multiple browsers & devices in sync when building websites, includes livereload capability.
const browserify = require("browserify"); // lets you require('modules') in the browser by bundling up all of your JavaScript source
const del = require("del");	// Module for deleting files
const fs = require("fs-extra");	// Module which adds file system methods that aren't included in the native node.js fs module
const gulp = require("gulp-help")(require("gulp")); // Adds a default help task to gulp and provides the ability to add custom help messages to your gulp tasks
const concat = require("gulp-concat"); // A gulp plugin to combine multiple files into a single file via streams
const requireDir = require("require-dir"); // Plugin to require() directories.
const source = require("vinyl-source-stream"); // Plugin to convert the readable stream from browserify into a vinyl stream for gulp

// const reload = connect.reload; // browser-sync component to reload the browser

const src = process.env.SOURCE_ROOT;
const dest = process.env.BASE_PATH;
const p_dest = "./pretty";
const main_script = process.env.APP_FILE;

const script_path = "/js/";
const style_path = "/css/";
const image_path = "/imgs/";
const page_path = "/";
const test_path = "./tests";

const page_dest = dest;
const style_dest = dest + style_path;
const script_dest = dest + script_path;
const image_dest = dest + image_path;
const pretty_dest = p_dest;

const main_script_assets = src + script_path + main_script;
const script_assets = src + script_path + "**/*.js"; // The **/ is used to make sure even any subdirectories are traversed
const style_assets = src + style_path + "*.css";
const page_assets = [src + page_path + "*.html", src + page_path + "*.json"];
const image_assets = src + image_path + "**/*.*";
const pretty_assets = [script_assets, "./*.md", "./doc/**/*.md"];

const root_assets = [
	src + page_path + "*.webmanifest",
	src + page_path + "*.ico",
	src + page_path + "*.xml"
];

module.exports = {
	comment1: "Export Variables; Some variables are pulled from the .ENV file",
	src: src,
	dest: dest,
	port: process.env.PORT,
	src_path: "../" + src+script_path,
	test_path: test_path,

	comment2: "The various assets which make up the application.",
	comment2a: "The individual assets are used in the individual build modules",
	main_script: main_script,
	main_script_assets: main_script_assets,
	script_assets: script_assets,
	style_assets: style_assets,
	page_assets: page_assets,
	root_assets: root_assets,
	image_assets: image_assets,
	pretty_assets: pretty_assets,

	page_dest: page_dest,
	style_dest: style_dest,
	script_dest: script_dest,
	image_dest: image_dest,
	pretty_dest: pretty_dest,

	assets: [page_assets, style_assets, script_assets, root_assets],

	comment3: "Export Modules",
	browserify: browserify,
	del: del,
	fs: fs,
	gulp: gulp,
	concat: concat,
	connect: connect,
	requireDir: requireDir,
	source: source
};
