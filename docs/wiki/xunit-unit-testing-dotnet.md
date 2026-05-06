# xUnit Unit Testing in .NET (Setup + Coverage)

Step-by-step instructions for setting up xUnit tests in a .NET solution, then collecting and viewing code coverage.

---

## Setup Steps (Workflow Used)

These steps match the workflow used in the SPA assessment project.

### 1. Create xUnit test project

```bash
dotnet new xunit -n <AppName>.Tests -o <AppName>.Tests
```

### 2. Add the test project to the solution

```bash
dotnet sln <SolutionFile> add <AppName>.Tests/<AppName>.Tests.csproj
```

Use the exact generated solution file name (`.sln` or `.slnx`).

### 3. Add xUnit runner package

```bash
dotnet add <AppName>.Tests/<AppName>.Tests.csproj package xunit.runner.visualstudio
```

This enables test discovery in IDEs.

### 4. Add project reference from tests to app

```bash
dotnet add <AppName>.Tests/<AppName>.Tests.csproj reference <AppName>/<AppName>.csproj
```

This allows tests to access app classes.

### 5. Add any test-only helper packages (as needed)

Example used when creating temporary `.xlsx` files in tests:

```bash
dotnet add <AppName>.Tests/<AppName>.Tests.csproj package ClosedXML
```

### 6. Run tests

```bash
dotnet test
```

`dotnet test` builds automatically before executing tests.

---

## Coverage Collection (XPlat)

### Collect coverage during test run

```bash
dotnet test --collect:"XPlat Code Coverage"
```

This writes coverage output under the test project's `TestResults` folder.

### Find the coverage file quickly

```bash
find . -type f -name "coverage.cobertura.xml"
```

The default coverage file is typically `coverage.cobertura.xml`.

---

## View Coverage as HTML

### Install report generator tool (one-time)

```bash
dotnet tool install --global dotnet-reportgenerator-globaltool
```

### Generate HTML report

```bash
reportgenerator -reports:"**/coverage.cobertura.xml" -targetdir:"CoverageReport" -reporttypes:Html
```

### Open report

Open `CoverageReport/index.html` in a browser.

---

## Notes

- Coverage percentage is a signal, not a guarantee of test quality.
- Use coverage to identify untested branches and error paths.
- Keep assertions specific; executing lines without meaningful assertions can inflate coverage without improving confidence.
