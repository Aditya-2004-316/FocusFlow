#!/usr/bin/env node

/**
 * Pre-Deployment Verification Script for FocusFlow
 *
 * This script checks if your project is ready for deployment to Render and Vercel
 * Run this before deploying to catch common issues early
 *
 * Usage: node verify-deployment-ready.js
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

let issuesFound = 0;
let warningsFound = 0;

function success(message) {
  console.log(`${colors.green}✓${colors.reset} ${message}`);
}

function error(message) {
  console.log(`${colors.red}✗${colors.reset} ${message}`);
  issuesFound++;
}

function warning(message) {
  console.log(`${colors.yellow}⚠${colors.reset} ${message}`);
  warningsFound++;
}

function info(message) {
  console.log(`${colors.blue}ℹ${colors.reset} ${message}`);
}

function header(message) {
  console.log(`\n${colors.cyan}━━━ ${message} ━━━${colors.reset}\n`);
}

function checkFileExists(filePath, description) {
  if (existsSync(filePath)) {
    success(`${description} exists`);
    return true;
  } else {
    error(`${description} not found at ${filePath}`);
    return false;
  }
}

function checkPackageJson(path, type) {
  try {
    const pkg = JSON.parse(readFileSync(path, 'utf8'));

    // Check for start script
    if (type === 'backend') {
      if (pkg.scripts && pkg.scripts.start) {
        success(`Backend has 'start' script: ${pkg.scripts.start}`);
      } else {
        error("Backend package.json missing 'start' script");
      }

      // Check for type: module
      if (pkg.type === 'module') {
        success('Backend uses ES modules');
      } else {
        warning('Backend not using ES modules - check imports');
      }

      // Check node version
      if (pkg.engines && pkg.engines.node) {
        success(`Backend Node version specified: ${pkg.engines.node}`);
      } else {
        warning('Backend should specify Node version in engines field');
      }

      // Check for required dependencies
      const requiredDeps = ['express', 'cors', 'mongoose', 'dotenv'];
      requiredDeps.forEach(dep => {
        if (pkg.dependencies && pkg.dependencies[dep]) {
          success(`Backend has ${dep} dependency`);
        } else {
          error(`Backend missing ${dep} dependency`);
        }
      });
    }

    if (type === 'frontend') {
      if (pkg.scripts && pkg.scripts.build) {
        success(`Frontend has 'build' script: ${pkg.scripts.build}`);
      } else {
        error("Frontend package.json missing 'build' script");
      }

      // Check for Vite
      if (pkg.devDependencies && pkg.devDependencies.vite) {
        success('Frontend uses Vite');
      } else {
        warning('Frontend should use Vite for building');
      }
    }

    return true;
  } catch (err) {
    error(`Failed to read ${path}: ${err.message}`);
    return false;
  }
}

function checkBackendIndex() {
  const indexPath = join(__dirname, 'backend', 'src', 'index.js');

  if (!existsSync(indexPath)) {
    error('Backend index.js not found at backend/src/index.js');
    return;
  }

  try {
    const content = readFileSync(indexPath, 'utf8');

    // Check for essential imports
    if (content.includes('import cors from')) {
      success('Backend imports CORS');
    } else {
      error('Backend missing CORS import');
    }

    if (content.includes('import express from')) {
      success('Backend imports Express');
    } else {
      error('Backend missing Express import');
    }

    if (content.includes('import dotenv from') || content.includes('dotenv.config()')) {
      success('Backend uses dotenv for environment variables');
    } else {
      error('Backend missing dotenv configuration');
    }

    // Check for CORS configuration
    if (content.includes('corsOptions') || content.includes('app.use(cors')) {
      success('Backend configures CORS');
    } else {
      error('Backend missing CORS configuration');
    }

    // Check for credentials: true in CORS
    if (content.includes('credentials: true') || content.includes('credentials:true')) {
      success('CORS configured with credentials support');
    } else {
      warning('CORS should enable credentials for cookies/auth');
    }

    // Check for PORT environment variable
    if (content.includes('process.env.PORT')) {
      success('Backend uses PORT environment variable');
    } else {
      error('Backend must use process.env.PORT for Render deployment');
    }

    // Check for app.listen
    if (content.includes('app.listen')) {
      success('Backend starts server with app.listen');
    } else {
      error('Backend missing app.listen call');
    }

  } catch (err) {
    error(`Failed to read backend index.js: ${err.message}`);
  }
}

function checkGitignore(path, type) {
  try {
    const content = readFileSync(path, 'utf8');

    if (content.includes('node_modules')) {
      success(`${type} .gitignore excludes node_modules`);
    } else {
      error(`${type} .gitignore missing node_modules`);
    }

    if (content.includes('.env')) {
      success(`${type} .gitignore excludes .env files`);
    } else {
      error(`${type} .gitignore missing .env exclusion`);
    }

    return true;
  } catch (err) {
    warning(`${type} .gitignore not found - should create one`);
    return false;
  }
}

function checkVercelConfig() {
  const vercelPath = join(__dirname, 'frontend', 'vercel.json');

  if (!existsSync(vercelPath)) {
    warning('vercel.json not found - creating one is recommended');
    info('This file ensures proper routing for React Router');
    return;
  }

  try {
    const config = JSON.parse(readFileSync(vercelPath, 'utf8'));

    if (config.rewrites && config.rewrites.length > 0) {
      success('vercel.json has rewrite rules for SPA routing');
    } else {
      warning('vercel.json should include rewrite rules for SPA routing');
    }

  } catch (err) {
    error(`Failed to parse vercel.json: ${err.message}`);
  }
}

function checkApiConfig() {
  const apiConfigPath = join(__dirname, 'frontend', 'src', 'config', 'api.js');

  if (!existsSync(apiConfigPath)) {
    warning('API configuration file not found at frontend/src/config/api.js');
    info('Creating this file is recommended to manage API endpoints');
    return;
  }

  try {
    const content = readFileSync(apiConfigPath, 'utf8');

    if (content.includes('import.meta.env.VITE_API_URL')) {
      success('API config uses VITE_API_URL environment variable');
    } else {
      error('API config should use import.meta.env.VITE_API_URL');
    }

    if (content.includes("credentials: 'include'")) {
      success('API config includes credentials for cookies');
    } else {
      warning("API calls should include credentials: 'include' for auth");
    }

  } catch (err) {
    error(`Failed to read api config: ${err.message}`);
  }
}

function checkEnvExamples() {
  const backendEnvExample = join(__dirname, 'backend', '.env.example');
  const frontendEnvExample = join(__dirname, 'frontend', '.env.production.example');

  if (existsSync(backendEnvExample)) {
    success('Backend has .env.example file');
  } else {
    warning('Backend should have .env.example to document required variables');
  }

  if (existsSync(frontendEnvExample)) {
    success('Frontend has .env.production.example file');
  } else {
    warning('Frontend should have .env.production.example');
  }
}

function printDeploymentChecklist() {
  header('Deployment Checklist');

  console.log('Before deploying, make sure you have:');
  console.log('');
  console.log('  1. MongoDB Atlas account and connection string');
  console.log('  2. Generated JWT_SECRET (64+ characters)');
  console.log('  3. Pushed all code to GitHub');
  console.log('  4. Render account for backend');
  console.log('  5. Vercel account for frontend');
  console.log('');
  console.log('Environment Variables Needed:');
  console.log('');
  console.log('  Backend (Render):');
  console.log('    - NODE_ENV=production');
  console.log('    - PORT=5000');
  console.log('    - MONGODB_URI=<your-connection-string>');
  console.log('    - JWT_SECRET=<your-secret>');
  console.log('    - JWT_EXPIRE=7d');
  console.log('    - CORS_ORIGIN_PROD=<your-vercel-url>');
  console.log('');
  console.log('  Frontend (Vercel):');
  console.log('    - VITE_API_URL=<your-render-url>');
  console.log('');
}

async function main() {
  console.log('');
  console.log(`${colors.cyan}╔════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║  FocusFlow Deployment Verification Tool   ║${colors.reset}`);
  console.log(`${colors.cyan}╚════════════════════════════════════════════╝${colors.reset}`);

  // Backend Checks
  header('Backend Structure');
  checkFileExists(join(__dirname, 'backend'), 'Backend directory');
  checkFileExists(join(__dirname, 'backend', 'package.json'), 'Backend package.json');
  checkFileExists(join(__dirname, 'backend', 'src', 'index.js'), 'Backend entry point');
  checkFileExists(join(__dirname, 'backend', '.gitignore'), 'Backend .gitignore');

  header('Backend Configuration');
  checkPackageJson(join(__dirname, 'backend', 'package.json'), 'backend');
  checkBackendIndex();
  checkGitignore(join(__dirname, 'backend', '.gitignore'), 'Backend');

  // Frontend Checks
  header('Frontend Structure');
  checkFileExists(join(__dirname, 'frontend'), 'Frontend directory');
  checkFileExists(join(__dirname, 'frontend', 'package.json'), 'Frontend package.json');
  checkFileExists(join(__dirname, 'frontend', 'index.html'), 'Frontend index.html');
  checkFileExists(join(__dirname, 'frontend', '.gitignore'), 'Frontend .gitignore');

  header('Frontend Configuration');
  checkPackageJson(join(__dirname, 'frontend', 'package.json'), 'frontend');
  checkGitignore(join(__dirname, 'frontend', '.gitignore'), 'Frontend');
  checkVercelConfig();
  checkApiConfig();

  // Additional Checks
  header('Deployment Files');
  checkEnvExamples();
  checkFileExists(join(__dirname, 'DEPLOYMENT_GUIDE.md'), 'Deployment guide');
  checkFileExists(join(__dirname, 'DEPLOYMENT_CHECKLIST.md'), 'Deployment checklist');

  // Summary
  header('Verification Summary');

  if (issuesFound === 0 && warningsFound === 0) {
    console.log(`${colors.green}🎉 Perfect! Your project is ready for deployment!${colors.reset}`);
  } else if (issuesFound === 0) {
    console.log(`${colors.yellow}⚠️  ${warningsFound} warning(s) found - review and fix if needed${colors.reset}`);
    console.log(`${colors.green}✓ No critical issues - you can proceed with deployment${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ ${issuesFound} error(s) found - must fix before deploying${colors.reset}`);
    if (warningsFound > 0) {
      console.log(`${colors.yellow}⚠️  ${warningsFound} warning(s) found${colors.reset}`);
    }
  }

  console.log('');

  if (issuesFound === 0) {
    printDeploymentChecklist();
    console.log(`${colors.cyan}📖 For detailed deployment instructions, see DEPLOYMENT_GUIDE.md${colors.reset}`);
    console.log(`${colors.cyan}✓ For quick reference, see DEPLOYMENT_CHECKLIST.md${colors.reset}`);
  } else {
    console.log(`${colors.red}Please fix the errors above before deploying.${colors.reset}`);
  }

  console.log('');
  process.exit(issuesFound > 0 ? 1 : 0);
}

main().catch(err => {
  console.error(`${colors.red}Verification failed:${colors.reset}`, err);
  process.exit(1);
});
