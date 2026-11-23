<#
  serve.ps1 - preview the website locally without installing anything.

      powershell -ExecutionPolicy Bypass -File tools\serve.ps1
  then open http://localhost:8080/  (Ctrl+C to stop)
#>
param([int]$Port = 8080)

$root = Split-Path -Parent $PSScriptRoot
$types = @{
  '.html'='text/html; charset=utf-8'; '.css'='text/css; charset=utf-8'; '.js'='text/javascript; charset=utf-8'
  '.json'='application/json'; '.svg'='image/svg+xml'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.png'='image/png'
  '.webp'='image/webp'; '.ico'='image/x-icon'; '.mp3'='audio/mpeg'; '.mp4'='video/mp4'; '.md'='text/plain; charset=utf-8'
  '.txt'='text/plain; charset=utf-8'; '.woff2'='font/woff2'
}
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $root at http://localhost:$Port/"
try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    try {
    $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
    if ($path -eq '' -or $path.EndsWith('/')) { $path += 'index.html' }
    $file = Join-Path $root $path
    $full = [IO.Path]::GetFullPath($file)
    if (-not $full.StartsWith($root) -or -not (Test-Path $full -PathType Leaf)) {
      $ctx.Response.StatusCode = 404
      $file = Join-Path $root '404.html'
      $full = if (Test-Path $file) { $file } else { $null }
    }
    if ($full) {
      $bytes = [IO.File]::ReadAllBytes($full)
      $ext = [IO.Path]::GetExtension($full).ToLower()
      $ctx.Response.ContentType = if ($types[$ext]) { $types[$ext] } else { 'application/octet-stream' }
      $ctx.Response.Headers.Add('Cache-Control', 'no-cache')
      $ctx.Response.ContentLength64 = $bytes.Length
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    }
    $ctx.Response.Close()
    } catch {
      # the browser closed the connection early (normal when it cancels a download)
      try { $ctx.Response.Abort() } catch {}
    }
  }
} finally { $listener.Stop() }
