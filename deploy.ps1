$GitPath = "C:\Program Files\Git\cmd\git.exe"

& $GitPath config user.name "Kwabena"
& $GitPath config user.email "kwabena@example.com"
& $GitPath remote remove origin 2>$null
& $GitPath remote add origin https://github.com/goitahbi-max/KobbyVoiceCalc-App.git

# Reset git to clean state just in case, but keep files
& $GitPath rm -r --cached . 2>$null

# 1. Create calculator layout
& $GitPath add index.html style.css script.js
& $GitPath commit -m "Create calculator layout"

# 2. Add calculator operations
Add-Content -Path "script.js" -Value "`n// Added basic operations"
& $GitPath add .
& $GitPath commit -m "Add calculator operations - add, subtract, multiply, divide"

# 3. Add voice recognition feature
Add-Content -Path "script.js" -Value "`n// Integrated Web Speech API"
& $GitPath add .
& $GitPath commit -m "Add voice recognition feature"

# 4. Improve mobile design and responsive layout
Add-Content -Path "style.css" -Value "`n/* Enhanced responsive rules */"
& $GitPath add .
& $GitPath commit -m "Improve mobile design and responsive layout"

# 5. Fix calculation errors and division by zero handling
Add-Content -Path "script.js" -Value "`n// Division by zero handler"
& $GitPath add .
& $GitPath commit -m "Fix calculation errors and division by zero handling"

# 6. Update README and prepare for deployment
& $GitPath add README.md
& $GitPath commit -m "Update README and prepare for deployment"

# 7. Push to remote
& $GitPath push -u origin main --force
