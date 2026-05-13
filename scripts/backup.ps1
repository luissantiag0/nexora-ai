# AverionAI Backup Script
# Usage: .\scripts\backup.ps1

$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$backupDir = "backups\$timestamp"
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null

Write-Output "[backup] Starting backup to $backupDir"

# Backup .env
if (Test-Path ".env") {
    Copy-Item ".env" "$backupDir\.env"
    Write-Output "[backup] .env saved"
}

# Backup Prisma schema
if (Test-Path "prisma\schema.prisma") {
    Copy-Item "prisma\schema.prisma" "$backupDir\schema.prisma"
    Write-Output "[backup] Prisma schema saved"
}

# Backup migrations
if (Test-Path "prisma\migrations") {
    Copy-Item -Recurse "prisma\migrations" "$backupDir\migrations"
    Write-Output "[backup] Migrations saved"
}

# Backup package.json
Copy-Item "package.json" "$backupDir\package.json"
Write-Output "[backup] package.json saved"

# Backup astro.config
Copy-Item "astro.config.mjs" "$backupDir\astro.config.mjs"
Write-Output "[backup] astro.config saved"

Write-Output "[backup] Backup complete: $backupDir"
