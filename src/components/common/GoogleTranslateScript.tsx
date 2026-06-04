/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect } from "react";
 
declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}
 
export function GoogleTranslateScript() {
  // ADD THIS BLOCK — THIS IS THE ONLY CHANGE YOU NEED
  useEffect(() => {
    const origRemove = Node.prototype.removeChild;
    const origAppend = Node.prototype.appendChild;
    const origInsert = Node.prototype.insertBefore;
 
    Node.prototype.removeChild = function (child: any) {
      try { return origRemove.call(this, child); }
      catch (e: any) { if (e.name === "NotFoundError") return child; throw e; }
    };
    Node.prototype.appendChild = function (child: any) {
      try { return origAppend.call(this, child); }
      catch (e: any) { if (e.name === "NotFoundError") return child; throw e; }
    };
    Node.prototype.insertBefore = function (newNode: any, ref: any) {
      try { return origInsert.call(this, newNode, ref); }
      catch (e: any) { if (e.name === "NotFoundError") return newNode; throw e; }
    };
 
    // No cleanup needed — safe to leave patched forever
  }, []);
  // END OF THE ONLY CHANGE
 
  useEffect(() => {
    // ... rest of your existing perfect code stays 100% unchanged
    let container = document.getElementById("google-translate-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "google-translate-container";
      document.body.insertBefore(container, document.body.firstChild);
    }
 
    if (document.getElementById("google-translate-script")) return;
 
    window.googleTranslateElementInit = () => {
      try {
        if (!window.google?.translate?.TranslateElement) return;
        const target = document.getElementById("google_translate_element");
        if (!target) return;
        target.innerHTML = "";
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,fr",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      } catch (error) {
        console.debug("[Google Translate] Initialization error",error);
      }
    };
 
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);
 
  return (
<div id="google_translate_element" style={{ display: "none" }} className="notranslate" />
  );
}