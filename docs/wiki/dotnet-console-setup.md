# .NET 10 Console App Setup (C#)

Steps to scaffold a .NET 10 C# console application with a companion xUnit test project and a NuGet package dependency.

---

## Prerequisites

- .NET 10 SDK installed and on your PATH
- Verify with: `dotnet --version`

---

## Steps

### 1. Create solution file

```bash
dotnet new sln -n <SolutionName>
```

Creates a solution file (`.sln` or `.slnx`) that groups the app and test projects together.

---

### 2. Create console app project

```bash
dotnet new console -n <AppName> -o <AppName>
```

Creates a new C# console app in a subfolder named `<AppName>`.

---

### 3. Create xUnit test project

```bash
dotnet new xunit -n <AppName>.Tests -o <AppName>.Tests
```

Creates an xUnit test project in a subfolder named `<AppName>.Tests`.

---

### 4. Add both projects to the solution

```bash
dotnet sln <SolutionFile> add <AppName>/<AppName>.csproj
dotnet sln <SolutionFile> add <AppName>.Tests/<AppName>.Tests.csproj
```

Use the file that was actually created in Step 1, for example `<SolutionName>.slnx`.

---

### 5. Add a NuGet package to the console app

```bash
dotnet add <AppName>/<AppName>.csproj package <PackageName>
```

Repeat for each package needed.

---

### 6. Add xUnit runner to the test project

```bash
dotnet add <AppName>.Tests/<AppName>.Tests.csproj package xunit.runner.visualstudio
```

Required for test discovery in VS Code and Visual Studio.

---

## Verify

```bash
dotnet restore
dotnet build
```

Both should complete without errors before writing any code.

---

## Notes

- **.NET 10 defaults:** Nullable reference types and implicit usings are enabled by default. No changes needed to `.csproj` unless you want to opt out.
- **Target framework:** Generated projects will target `net10.0`. Verify in the `.csproj` file if needed.
- **Test project reference:** The xUnit test project does not automatically reference the app project. Add a project reference manually when you're ready to test app code:
  ```bash
  dotnet add <AppName>.Tests/<AppName>.Tests.csproj reference <AppName>/<AppName>.csproj
  ```

---

## Troubleshooting

- **Installed .NET 10 but `dotnet --list-sdks` still does not show it:**
  This is usually an architecture mismatch. On Windows, confirm you installed the **x64** SDK if your `dotnet` executable is using `C:\Program Files\dotnet`. Reinstall x64 and recheck.

- **SDK install succeeded but terminal still shows old versions:**
  Open a new terminal window first. If needed, restart VS Code so PATH updates are picked up by the integrated terminal.

- **`dotnet sln ... add ...` fails with solution not found:**
  Your file may be `.slnx` instead of `.sln`. Run `ls` in repo root and use the exact filename with `dotnet sln`.
