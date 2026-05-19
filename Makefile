SHELL := /bin/zsh
.DEFAULT_GOAL := help

CHRUBY_VERSION ?= ruby-3.3.5
CHRUBY_SH ?= /opt/homebrew/opt/chruby/share/chruby/chruby.sh
HOST ?= 127.0.0.1
PORT ?= 4002
LIVERELOAD_PORT ?= 35730

RUBY_SETUP = source "$(CHRUBY_SH)" && chruby "$(CHRUBY_VERSION)"

.PHONY: help doctor setup serve serve-live build github-build validate check clean

help:
	@printf "\nPersonal website commands\n\n"
	@printf "  make serve          Start Jekyll at http://$(HOST):$(PORT)\n"
	@printf "  make serve-live     Start Jekyll with LiveReload\n"
	@printf "  make build          Run the normal local Jekyll build\n"
	@printf "  make github-build   Run the GitHub Pages-compatible build\n"
	@printf "  make validate       Validate publication data\n"
	@printf "  make check          Run build, GitHub Pages build, and validation\n"
	@printf "  make setup          Install/update bundle dependencies\n"
	@printf "  make doctor         Show Ruby/Bundler/Jekyll versions\n"
	@printf "  make clean          Clean generated Jekyll output\n\n"
	@printf "Tip: use PORT=4002 if another server is already on 4001.\n\n"

doctor:
	@$(RUBY_SETUP) && ruby -v && bundle -v && bundle exec jekyll -v && github-pages --version

setup:
	$(RUBY_SETUP) && bundle install

serve:
	$(RUBY_SETUP) && bundle exec jekyll serve --host $(HOST) --port $(PORT)

serve-live:
	$(RUBY_SETUP) && bundle exec jekyll serve --host $(HOST) --port $(PORT) --livereload --livereload-port $(LIVERELOAD_PORT)

build:
	$(RUBY_SETUP) && bundle exec jekyll build

github-build:
	$(RUBY_SETUP) && github-pages build --trace

validate:
	$(RUBY_SETUP) && bundle exec script/validate-publications

check: build github-build validate

clean:
	$(RUBY_SETUP) && bundle exec jekyll clean
