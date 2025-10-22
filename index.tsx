import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// --- PWA Service Worker and Install Prompt Logic ---

// This variable will hold the event that triggers the installation prompt.
let deferredPrompt: any;

// 1. Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // The service worker file is named sw.js in this project.
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker: Registrado com sucesso.', reg))
            .catch(err => console.log('Service Worker: Falha no registro: ', err));
    });
}

// 2. 'beforeinstallprompt' Event Handler
// This event is fired by the browser when the app is installable.
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default mini-infobar from appearing on mobile.
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;

    // Show our custom install banner.
    const installBanner = document.getElementById('pwa-install-banner');
    if (installBanner) {
        console.log('Mostrando banner de instalação PWA.');
        installBanner.classList.add('visible');
    }
});

// 3. Install Button Click Handler
const installButton = document.getElementById('pwa-install-btn');
installButton?.addEventListener('click', async () => {
    const installBanner = document.getElementById('pwa-install-banner');

    // Hide the banner.
    if (installBanner) {
        installBanner.classList.remove('visible');
    }

    // Check if we have the deferred prompt.
    if (deferredPrompt) {
        // Show the native browser install prompt.
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt.
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`PWA setup user response: ${outcome}`);
        // We've used the prompt, so we can't use it again. Clear it.
        deferredPrompt = null;
    }
});

// 4. Dismiss Button Click Handler
const dismissButton = document.getElementById('pwa-dismiss-btn');
dismissButton?.addEventListener('click', () => {
    const installBanner = document.getElementById('pwa-install-banner');
    if (installBanner) {
        installBanner.classList.remove('visible');
    }
});


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);