# Image Copy Helper Script
# Usage: Save this file and run in PowerShell in your project root

# Function to copy image with validation
function Copy-ImageFile {
    param(
        [string]$SourcePath,
        [string]$DestinationFolder,
        [string]$DestinationName
    )
    
    if (Test-Path $SourcePath) {
        $destPath = Join-Path $DestinationFolder $DestinationName
        Copy-Item $SourcePath $destPath -Force
        Write-Host "✓ Copied: $DestinationName" -ForegroundColor Green
    } else {
        Write-Host "✗ File not found: $SourcePath" -ForegroundColor Red
    }
}

# Create folders if they don't exist
@("public\about", "public\products", "public\technology") | ForEach-Object {
    if (-not (Test-Path $_)) {
        New-Item -ItemType Directory -Path $_ -Force | Out-Null
        Write-Host "Created folder: $_" -ForegroundColor Cyan
    }
}

Write-Host "`n=== Image File Copy Helper ===" -ForegroundColor Yellow
Write-Host "Place your images in any folder and provide full paths below`n" -ForegroundColor Gray

# Example usage (modify these paths to your actual image locations):
# Copy-ImageFile "C:\Users\DELL\Downloads\company.jpg" "public\about" "company-building.jpg"
# Copy-ImageFile "C:\Users\DELL\Downloads\iron.jpg" "public\products" "iron-powder.jpg"

# Interactive mode
$continue = $true
while ($continue) {
    Write-Host "`nOptions:" -ForegroundColor Cyan
    Write-Host "1. Copy single image" -ForegroundColor White
    Write-Host "2. Copy batch images" -ForegroundColor White
    Write-Host "3. List created folders" -ForegroundColor White
    Write-Host "4. Exit" -ForegroundColor White
    
    $choice = Read-Host "Enter choice (1-4)"
    
    switch ($choice) {
        "1" {
            $source = Read-Host "Source image path"
            $dest = Read-Host "Destination folder (about/products/technology)"
            $name = Read-Host "New filename (with extension)"
            Copy-ImageFile $source "public\$dest" $name
        }
        "2" {
            Write-Host "Batch copy mode - enter pairs of (source, destination folder, filename)"
            Write-Host "Type 'done' when finished"
            do {
                $source = Read-Host "Source image path (or 'done')"
                if ($source -eq 'done') { break }
                $dest = Read-Host "Destination (about/products/technology)"
                $name = Read-Host "Filename"
                Copy-ImageFile $source "public\$dest" $name
            } while ($true)
        }
        "3" {
            Write-Host "`nFolder Structure:" -ForegroundColor Cyan
            Get-ChildItem -Path "public" -Recurse -Directory | ForEach-Object {
                Write-Host "  $_" -ForegroundColor Green
            }
            Get-ChildItem -Path "public" -Recurse -File | ForEach-Object {
                Write-Host "    - $($_.Name)" -ForegroundColor White
            }
        }
        "4" {
            $continue = $false
            Write-Host "Goodbye!" -ForegroundColor Green
        }
        default {
            Write-Host "Invalid choice" -ForegroundColor Red
        }
    }
}
