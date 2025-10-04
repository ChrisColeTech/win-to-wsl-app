# Create self-signed code signing certificate
# Run this in PowerShell as Administrator

# Create the certificate
$cert = New-SelfSignedCertificate `
    -Type CodeSigningCert `
    -Subject "CN=ChrisColeTech Development" `
    -KeyAlgorithm RSA `
    -KeyLength 2048 `
    -Provider "Microsoft Enhanced RSA and AES Cryptographic Provider" `
    -CertStoreLocation "Cert:\CurrentUser\My" `
    -NotAfter (Get-Date).AddYears(3)

Write-Host "Certificate created with thumbprint: $($cert.Thumbprint)" -ForegroundColor Green

# Export to PFX (for signing)
$password = Read-Host "Enter password for certificate export" -AsSecureString
$pfxPath = "$PSScriptRoot\code-signing-cert.pfx"
Export-PfxCertificate -Cert $cert -FilePath $pfxPath -Password $password
Write-Host "Certificate exported to: $pfxPath" -ForegroundColor Green

# Install in Trusted Root (this makes Windows trust it)
Write-Host "`nInstalling certificate to Trusted Root..." -ForegroundColor Yellow
$store = New-Object System.Security.Cryptography.X509Certificates.X509Store("Root", "CurrentUser")
$store.Open("ReadWrite")
$store.Add($cert)
$store.Close()

Write-Host "`nDone! Certificate is now trusted on this machine." -ForegroundColor Green
Write-Host "PFX file: $pfxPath" -ForegroundColor Cyan
Write-Host "`nTo use with electron-builder, add this to electron-builder.json:" -ForegroundColor Yellow
Write-Host @"
{
  "win": {
    "certificateFile": "scripts/code-signing-cert.pfx",
    "certificatePassword": "win-2-wsl-v2"
  }
}
"@ -ForegroundColor Cyan
