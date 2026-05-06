# Coverage Report Script

A bash script pattern for running .NET tests with code coverage and opening the HTML report automatically. Works on Windows (Git Bash), macOS, and Linux.

This approach is framework-agnostic — it works with xUnit, NUnit, or MSTest.

---

## What the Script Does

1. Runs `dotnet test` with `--collect:"XPlat Code Coverage"` and a `.runsettings` file
2. Finds the generated `coverage.cobertura.xml` file
3. Installs ReportGenerator globally on first run if not already present
4. Generates an HTML coverage report
5. Opens the report in Firefox (with fallbacks to system default browser)

---

## Script

Place this file in your test project folder (e.g. `MyApp.Tests/coverage-report.sh`).

```bash
#!/bin/bash

# Run tests with coverlet and display coverage report in browser.
# Usage: ./coverage-report.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

RESULTS_DIR="$SCRIPT_DIR/TestResults"
REPORT_DIR="$REPO_ROOT/TestResults/coverage-report"
TEST_PROJECT="$SCRIPT_DIR/MyApp.Tests.csproj"

rm -rf "$RESULTS_DIR"
mkdir -p "$RESULTS_DIR" "$REPORT_DIR"

echo "Running tests with code coverage..."
dotnet test "$TEST_PROJECT" \
  --logger "console;verbosity=minimal" \
  --collect:"XPlat Code Coverage" \
  --results-directory "$RESULTS_DIR" \
  --settings "$SCRIPT_DIR/coverage.runsettings"

COVERAGE_FILE="$(find "$RESULTS_DIR" -type f -name "coverage.cobertura.xml" | head -n 1)"

if [[ -z "$COVERAGE_FILE" ]]; then
  echo "Coverage file not found under $RESULTS_DIR."
  exit 1
fi

# Auto-install ReportGenerator globally on first run if not already available.
echo "Generating HTML coverage report..."
if command -v reportgenerator >/dev/null 2>&1; then
  REPORT_TOOL="reportgenerator"
elif dotnet tool list -g | grep -q "dotnet-reportgenerator-globaltool"; then
  REPORT_TOOL="reportgenerator"
else
  echo "Installing ReportGenerator as global tool..."
  dotnet tool install -g dotnet-reportgenerator-globaltool
  REPORT_TOOL="reportgenerator"
fi

"$REPORT_TOOL" \
  -reports:"$COVERAGE_FILE" \
  -targetdir:"$REPORT_DIR" \
  -reporttypes:Html

REPORT_FILE="$REPORT_DIR/index.html"
echo "Coverage report generated at: $REPORT_FILE"

# Open in Firefox first; fall back through common Windows/Git Bash paths, then system default.
OPENED_REPORT=0
WIN_REPORT_FILE="$(cygpath -w "$REPORT_FILE" 2>/dev/null || echo "$REPORT_FILE")"

if command -v firefox >/dev/null 2>&1; then
  firefox "$REPORT_FILE" >/dev/null 2>&1 && OPENED_REPORT=1
fi

if [[ "$OPENED_REPORT" -eq 0 ]] && command -v firefox.exe >/dev/null 2>&1; then
  firefox.exe "$WIN_REPORT_FILE" >/dev/null 2>&1 && OPENED_REPORT=1
fi

if [[ "$OPENED_REPORT" -eq 0 ]] && [[ -x "/c/Program Files/Mozilla Firefox/firefox.exe" ]]; then
  "/c/Program Files/Mozilla Firefox/firefox.exe" "$WIN_REPORT_FILE" >/dev/null 2>&1 && OPENED_REPORT=1
fi

if [[ "$OPENED_REPORT" -eq 0 ]] && [[ -x "/c/Program Files (x86)/Mozilla Firefox/firefox.exe" ]]; then
  "/c/Program Files (x86)/Mozilla Firefox/firefox.exe" "$WIN_REPORT_FILE" >/dev/null 2>&1 && OPENED_REPORT=1
fi

if command -v cmd.exe >/dev/null 2>&1; then
  [[ "$OPENED_REPORT" -eq 0 ]] && cmd.exe /c start "" "$WIN_REPORT_FILE" >/dev/null 2>&1 && OPENED_REPORT=1
fi

if [[ "$OPENED_REPORT" -eq 0 ]] && command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$REPORT_FILE" >/dev/null 2>&1 && OPENED_REPORT=1
fi

if [[ "$OPENED_REPORT" -eq 0 ]] && command -v open >/dev/null 2>&1; then
  open "$REPORT_FILE" >/dev/null 2>&1 && OPENED_REPORT=1
fi

if [[ "$OPENED_REPORT" -eq 0 ]]; then
  echo "Could not open browser automatically. Open manually: $REPORT_FILE"
fi
```

---

## runsettings File

Place `coverage.runsettings` alongside the script in the test project folder.

```xml
<?xml version="1.0" encoding="utf-8" ?>
<RunSettings>
  <DataCollectionRunSettings>
    <DataCollectors>
      <DataCollector friendlyName="XPlat Code Coverage">
        <Configuration>
          <!-- Exclude the top-level statements entry point from coverage.
               Entry-point wiring is verified by manual/integration testing, not unit tests. -->
          <Exclude>[MyApp]Program</Exclude>
        </Configuration>
      </DataCollector>
    </DataCollectors>
  </DataCollectionRunSettings>
</RunSettings>
```

Replace `MyApp` with your assembly name.

---

## Why Exclude Program?

Top-level statement programs (C# 9+) generate a synthetic `<Main>$` method. This method shows up in coverage with 0% coverage, which inflates the CRAP score significantly even when all real business logic is well-tested. Excluding it via runsettings keeps metrics focused on testable code.

---

## Firefox Fallback Logic

The script checks for Firefox in four ways because Windows does not automatically expose installed applications as shell commands in Git Bash:

1. `firefox` — Unix-style command on PATH (Linux/macOS)
2. `firefox.exe` — Windows executable on PATH
3. `/c/Program Files/Mozilla Firefox/firefox.exe` — 64-bit Windows install path
4. `/c/Program Files (x86)/Mozilla Firefox/firefox.exe` — 32-bit Windows install path

If none are found, it falls back to `cmd.exe start` (Windows default browser) and then `xdg-open`/`open` for Linux/macOS.

---

## Usage

```bash
cd MyApp.Tests
./coverage-report.sh
```

Run from the test project folder. The HTML report opens automatically on success.
