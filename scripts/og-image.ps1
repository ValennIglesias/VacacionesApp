# Genera public/og.png (1200x630) para la vista previa al compartir links.
# Uso: powershell -ExecutionPolicy Bypass -File scripts/og-image.ps1 -Brand "Nombre"
param([string]$Brand = "TribuSplit", [string]$Tagline = "Los gastos del viaje, claros y repartidos")
Add-Type -AssemblyName System.Drawing
$root = Split-Path $PSScriptRoot -Parent
$W = 1200; $H = 630
$bmp = New-Object System.Drawing.Bitmap $W, $H
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'; $g.TextRenderingHint = 'AntiAliasGridFit'; $g.InterpolationMode = 'HighQualityBicubic'

# fondo: acento con un degradado suave
$rect = New-Object System.Drawing.Rectangle 0, 0, $W, $H
$bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, ([System.Drawing.Color]::FromArgb(255, 47, 91, 255)), ([System.Drawing.Color]::FromArgb(255, 36, 73, 216)), 35
$g.FillRectangle($bg, $rect)
$soft = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(28, 255, 255, 255))
$g.FillEllipse($soft, 760, -180, 620, 620); $g.FillEllipse($soft, 640, 360, 420, 420)

# textos
$white = [System.Drawing.Brushes]::White
$dim = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(215, 255, 255, 255))
$g.DrawString($Brand, (New-Object System.Drawing.Font 'Segoe UI', 64, ([System.Drawing.FontStyle]::Bold)), $white, 80, 170)
$fmt = New-Object System.Drawing.StringFormat
$g.DrawString($Tagline, (New-Object System.Drawing.Font 'Segoe UI', 34), $dim, (New-Object System.Drawing.RectangleF 84, 290, 560, 160), $fmt)

# avatares de la app en círculos blancos
$items = @(@('smiling-face-with-sunglasses', 830, 120, 190), @('airplane', 1000, 270, 150), @('palm-tree', 780, 360, 150), @('partying-face', 960, 450, 120))
foreach ($it in $items) {
  $x = $it[1]; $y = $it[2]; $s = $it[3]
  $g.FillEllipse((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(245, 255, 255, 255))), $x, $y, $s, $s)
  $img = [System.Drawing.Image]::FromFile((Join-Path $root "public/avatars/3d/$($it[0]).png"))
  $pad = [int]($s * 0.15)
  $g.DrawImage($img, $x + $pad, $y + $pad, $s - 2 * $pad, $s - 2 * $pad)
  $img.Dispose()
}
$bmp.Save((Join-Path $root 'public/og.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
"ok: public/og.png"
