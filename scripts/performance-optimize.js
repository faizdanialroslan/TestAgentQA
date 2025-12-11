// Performance optimization script for Playwright tests
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class PerformanceOptimizer {
  static async cleanupTestArtifacts() {
    // Clean up old test artifacts that might slow down tests
    const artifactDirs = [
      'test-results',
      'playwright-report',
      'screenshots',
      '.playwright'
    ];

    for (const dir of artifactDirs) {
      const dirPath = path.join(process.cwd(), dir);
      if (fs.existsSync(dirPath)) {
        fs.rmSync(dirPath, { recursive: true, force: true });
        console.log(`🧹 Cleaned up ${dir}`);
      }
    }
  }

  static async killPlaywrightProcesses() {
    // Kill any hanging playwright processes
    return new Promise((resolve) => {
      exec('taskkill /F /IM chrome.exe /T 2>nul || true', () => {
        exec('taskkill /F /IM msedge.exe /T 2>nul || true', () => {
          exec('taskkill /F /IM firefox.exe /T 2>nul || true', () => {
            console.log('🔄 Cleaned up browser processes');
            resolve();
          });
        });
      });
    });
  }

  static async optimizeBeforeRun() {
    console.log('🚀 Optimizing for test run...');
    await this.cleanupTestArtifacts();
    await this.killPlaywrightProcesses();
    
    // Add small delay to ensure cleanup is complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('✅ Optimization complete');
  }
}

// Run optimization if called directly
if (require.main === module) {
  PerformanceOptimizer.optimizeBeforeRun();
}

module.exports = PerformanceOptimizer;