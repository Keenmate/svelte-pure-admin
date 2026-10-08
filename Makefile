# Makefile for @keenmate/svelte-pure-admin Monorepo

.PHONY: help setup install dev dev-lib kill-port build build-docs build-all package check check-lib check-docs publish publish-rc publish-dry clean sync-snippets sync-snippets-update verify podman-build podman-run podman-stop podman-restart podman-logs podman-clean podman-deploy podman-push

# === Shell Configuration (cross-platform) ===
# Use sh on Unix, cmd on Windows
ifeq ($(OS),Windows_NT)
    SHELL := cmd.exe
    RM_RF := rmdir /s /q
    NULL := nul
else
    SHELL := /bin/sh
    RM_RF := rm -rf
    NULL := /dev/null
endif

# === Configuration ===
DOCKER_IMAGE_NAME = svelte-pure-admin
DOCKER_REGISTRY = registry.km8.es
DOCKER_TAG = production
DOCKER_CONTAINER_NAME = svelte-pure-admin
DOCKER_PORT = 8081

# NPM publish tag
TAG ?=
NPM_TAG = $(if $(TAG),--tag $(TAG),)

# Default target
help:
	@echo "Pure Admin Svelte Monorepo - Available targets:"
	@echo ""
	@echo "  Setup:"
	@echo "    make setup                - Initial project setup (install dependencies)"
	@echo "    make install              - Install all workspace dependencies"
	@echo ""
	@echo "  Development:"
	@echo "    make dev                  - Start docs dev server (port 18800)"
	@echo "    make dev-lib              - Start library dev server"
	@echo "    make kill-port            - Free the docs dev-server port (18800)"
	@echo "    make build                - Build library package"
	@echo "    make build-docs           - Build docs site"
	@echo "    make build-all            - Build library + docs"
	@echo "    make package              - Package library for publishing"
	@echo "    make check                - Run type checking (all workspaces)"
	@echo "    make check-lib            - Run type checking (library only)"
	@echo "    make check-docs           - Run type checking (docs only)"
	@echo "    make clean                - Remove build artifacts"
	@echo ""
	@echo "  Snippets:"
	@echo "    make sync-snippets        - Check for snippet changes"
	@echo "    make sync-snippets-update - Update snippet manifest"
	@echo ""
	@echo "  Package:"
	@echo "    make verify               - Clean, build, and verify package"
	@echo "    make publish TAG=rc       - Publish to npm (TAG required for prereleases)"
	@echo "    make publish-rc           - Publish to npm under the rc dist-tag"
	@echo "    make publish-dry TAG=rc   - Dry run publish"
	@echo ""
	@echo "  Docker (docs site):"
	@echo "    make podman-build         - Build Podman image"
	@echo "    make podman-run           - Run Podman container"
	@echo "    make podman-stop          - Stop Podman container"
	@echo "    make podman-restart       - Restart Podman container"
	@echo "    make podman-logs          - Show Podman container logs"
	@echo "    make podman-clean         - Remove Podman container and image"
	@echo "    make podman-deploy        - Build and run Podman container"
	@echo "    make podman-push          - Tag and push image to registry"
	@echo ""

# Initial project setup
setup:
	npm install

# Install dependencies
install:
	npm install

# Start docs development server (main dev workflow)
dev:
	npx @keenmate/pureadmin themes install
	npm run dev

# Start library dev server (for library-only development)
dev-lib:
	npm run dev:lib

# Free the docs dev-server port. The docs vite config pins port 18800 with
# strictPort, so a stale run holds exactly 18800 (no hop). Kills whatever is
# LISTENING on it, covering both IPv4 and IPv6 (vite binds [::1] too). On
# Windows the recipe runs in cmd.exe (see SHELL config above), so we shell out
# to PowerShell with double quotes; `$$_` emits a literal `$_` for PowerShell's
# pipeline variable.
kill-port:
	@echo "Freeing port 18800..."
ifeq ($(OS),Windows_NT)
	-@powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort 18800 -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { Stop-Process -Id $$_ -Force -ErrorAction SilentlyContinue }"
else
	-@lsof -ti tcp:18800 | xargs -r kill -9
endif
	@echo "Port 18800 is free"

# Build library
build:
	npm run build

# Build docs
build-docs:
	npm run build:docs

# Build all
build-all:
	npm run build:all

# Package library only
package:
	npm run package

# Type check all
check:
	npm run check

# Type check library
check-lib:
	npm run check:lib

# Type check docs
check-docs:
	npm run check:docs

# Markup fidelity: re-dump ALL scenarios fresh, then run the core markup + coverage
# gate (dumps are gitignored → re-dumping IS the freshness guarantee)
fidelity:
	npm run fidelity

# Check for snippet changes
sync-snippets:
	npm run sync:snippets

# Update snippet manifest
sync-snippets-update:
	npm run sync:snippets:update

# Verify package (clean + build + pack)
verify: clean build
	@echo "Creating package tarball for verification..."
	npm pack -w @keenmate/svelte-pure-admin
	@echo "Package verified and ready!"

# Publish to npm
publish: clean build
	@echo "Publishing @keenmate/svelte-pure-admin to npm..."
	npm publish -w @keenmate/svelte-pure-admin --access public $(NPM_TAG)

# Publish a prerelease to npm under the rc dist-tag (so it never becomes `latest`)
publish-rc:
	$(MAKE) publish TAG=rc

# Dry run publish
publish-dry: clean build
	@echo "Running dry-run publish test..."
	npm publish -w @keenmate/svelte-pure-admin --dry-run --access public $(NPM_TAG)

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	npm run clean
ifeq ($(OS),Windows_NT)
	@if exist node_modules\.cache rmdir /s /q node_modules\.cache
else
	rm -rf node_modules/.cache
endif
	@echo "Clean complete!"

# === Podman Commands (for docs site) ===

podman-build:
	@echo "Building Podman image: $(DOCKER_IMAGE_NAME):$(DOCKER_TAG)"
	podman build -t $(DOCKER_IMAGE_NAME):$(DOCKER_TAG) .
	@echo "Podman image built successfully!"

podman-run:
	@echo "Starting Podman container on port $(DOCKER_PORT)"
	@if [ $$(podman ps -q -f name=$(DOCKER_CONTAINER_NAME)) ]; then \
		echo "Container is already running at http://localhost:$(DOCKER_PORT)"; \
	elif [ $$(podman ps -aq -f name=$(DOCKER_CONTAINER_NAME)) ]; then \
		echo "Starting existing container"; \
		podman start $(DOCKER_CONTAINER_NAME); \
		echo "Application is running at: http://localhost:$(DOCKER_PORT)"; \
	else \
		echo "Creating and starting new container"; \
		podman run -d --name $(DOCKER_CONTAINER_NAME) -p $(DOCKER_PORT):80 $(DOCKER_IMAGE_NAME):$(DOCKER_TAG); \
		echo "Application is running at: http://localhost:$(DOCKER_PORT)"; \
	fi

podman-stop:
	@echo "Stopping Podman container"
	@if [ $$(podman ps -q -f name=$(DOCKER_CONTAINER_NAME)) ]; then \
		podman stop $(DOCKER_CONTAINER_NAME); \
		echo "Container stopped successfully"; \
	else \
		echo "Container is not running"; \
	fi

podman-restart: podman-stop podman-run

podman-logs:
	@if [ $$(podman ps -aq -f name=$(DOCKER_CONTAINER_NAME)) ]; then \
		podman logs -f $(DOCKER_CONTAINER_NAME); \
	else \
		echo "Container does not exist"; \
	fi

podman-clean: podman-stop
	@echo "Cleaning up Podman resources"
	@if [ $$(podman ps -aq -f name=$(DOCKER_CONTAINER_NAME)) ]; then \
		podman rm $(DOCKER_CONTAINER_NAME); \
		echo "Container removed"; \
	fi
	@if [ $$(podman images -q $(DOCKER_IMAGE_NAME):$(DOCKER_TAG)) ]; then \
		podman rmi $(DOCKER_IMAGE_NAME):$(DOCKER_TAG); \
		echo "Image removed"; \
	fi

podman-deploy: podman-build podman-run

podman-push:
	@echo "Tagging and pushing image to $(DOCKER_REGISTRY)"
	podman tag $(DOCKER_IMAGE_NAME):$(DOCKER_TAG) $(DOCKER_REGISTRY)/$(DOCKER_IMAGE_NAME):$(DOCKER_TAG)
	podman push $(DOCKER_REGISTRY)/$(DOCKER_IMAGE_NAME):$(DOCKER_TAG)
	@echo "Image pushed to $(DOCKER_REGISTRY)/$(DOCKER_IMAGE_NAME):$(DOCKER_TAG)"
