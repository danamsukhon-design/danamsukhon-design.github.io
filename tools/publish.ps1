<#
  publish.ps1 - put every change online.
  Stamps index.html with a new version (so browsers load the newest files instead of an old saved copy),
  then commits and pushes to GitHub. The live site updates within a minute or two.

      powershell -ExecutionPolicy Bypass -File tools\publish.ps1 "What changed"
#>
param([string]$Message = "Update portfolio")
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
$env:Path += ";C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI"
$f = Join-Path $root 'index.html'
$v = (Get-Date).ToString('yyyyMMddHHmm')
$t = [IO.File]::ReadAllText($f)
$t = [regex]::Replace($t, '(src|href)="((?:js|css|assets/images)/[^"?]+\.(?:js|css))(?:\?v=\d+)?"', ('$1="$2?v=' + $v + '"'))
[IO.File]::WriteAllText($f, $t, (New-Object System.Text.UTF8Encoding $false))
git add -A
git commit -q -m $Message
git push
"Published version $v"
