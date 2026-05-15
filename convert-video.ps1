# Convert Hero Video to WebM for better mobile performance
# Run this script to convert hero-video.mp4 to hero-video.webm

# Check if ffmpeg is installed
if (!(Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    Write-Host "FFmpeg not found. Please install FFmpeg first:" -ForegroundColor Red
    Write-Host "1. Download from: https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip" -ForegroundColor Yellow
    Write-Host "2. Extract and add bin folder to PATH" -ForegroundColor Yellow
    Write-Host "Or use: choco install ffmpeg" -ForegroundColor Yellow
    exit 1
}

$inputFile = "public\hero-video.mp4"
$outputFile = "public\hero-video.webm"

Write-Host "Converting hero-video.mp4 to WebM format..." -ForegroundColor Green

# Convert to WebM with VP9 codec for best compression/quality ratio
# -c:v libvpx-vp9: Use VP9 video codec (better compression than VP8)
# -crf 30: Constant Rate Factor (0-63, lower is better quality, 30 is good balance)
# -b:v 0: Use constant quality mode instead of bitrate
# -deadline good: Encoding speed/quality tradeoff
# -cpu-used 2: Speed preset (0-5, higher is faster)
# -c:a libopus: Use Opus audio codec
# -an: No audio (since it's a background video)

ffmpeg -i $inputFile `
    -c:v libvpx-vp9 `
    -crf 35 `
    -b:v 0 `
    -deadline good `
    -cpu-used 2 `
    -row-mt 1 `
    -an `
    -vf "scale=-1:720" `
    $outputFile

if (Test-Path $outputFile) {
    $originalSize = (Get-Item $inputFile).Length / 1MB
    $newSize = (Get-Item $outputFile).Length / 1MB
    $reduction = [math]::Round((($originalSize - $newSize) / $originalSize) * 100, 1)
    
    Write-Host "✅ Conversion successful!" -ForegroundColor Green
    Write-Host "Original MP4: $([math]::Round($originalSize, 2)) MB" -ForegroundColor Cyan
    Write-Host "New WebM: $([math]::Round($newSize, 2)) MB" -ForegroundColor Cyan
    Write-Host "Size reduction: $reduction%" -ForegroundColor Green
} else {
    Write-Host "❌ Conversion failed" -ForegroundColor Red
}
