# 🚀 Fast Test Execution Guide

## Quick Commands for Speed:

### 1. **Headless Mode (Fastest)**
```bash
npx playwright test TS001_signup
```

### 2. **Single Test Case (Ultra Fast)**
```bash
npx playwright test TS001_signup -g "TC1 - Successful user registration"
```

### 3. **Parallel with More Workers**
```bash
npx playwright test TS001_signup --workers=8
```

### 4. **Skip Slow Tests**
```bash
npx playwright test TS001_signup --grep-invert="slow|performance"
```

### 5. **Fast Reporter**
```bash
npx playwright test TS001_signup --reporter=list
```

## Environment Variables for Speed:
```bash
# Run in CI mode (faster, less retries)
set CI=true && npx playwright test TS001_signup

# Block images/CSS for faster loading
set FAST_MODE=true && npx playwright test TS001_signup
```

## Tips Applied:
- ✅ **Reduced timeouts** by 50-70%
- ✅ **Headless mode** by default
- ✅ **Faster reporters** (list vs html)
- ✅ **networkidle** wait strategy
- ✅ **Optimized selectors**
- ✅ **Resource blocking** available
- ✅ **Parallel execution** enabled