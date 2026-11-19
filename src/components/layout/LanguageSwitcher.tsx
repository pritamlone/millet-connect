"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Check, Globe } from "lucide-react";
import { LOCALES, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const labelId = useId();

  const currentLocale = LOCALES.find((l) => l.code === locale);

  const selectLocale = useCallback(
    (code: Locale) => {
      setLocale(code);
      setOpen(false);
      setFocusedIndex(-1);
    },
    [setLocale]
  );

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setFocusedIndex(-1);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case "ArrowDown":
      case "Enter":
      case " ":
        event.preventDefault();
        setOpen(true);
        setFocusedIndex(LOCALES.findIndex((l) => l.code === locale));
        break;
      case "ArrowUp":
        event.preventDefault();
        setOpen(true);
        setFocusedIndex(LOCALES.length - 1);
        break;
      default:
        break;
    }
  };

  const handleListKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (!open) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % LOCALES.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setFocusedIndex((prev) => (prev <= 0 ? LOCALES.length - 1 : prev - 1));
        break;
      case "Home":
        event.preventDefault();
        setFocusedIndex(0);
        break;
      case "End":
        event.preventDefault();
        setFocusedIndex(LOCALES.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (focusedIndex >= 0) {
          selectLocale(LOCALES[focusedIndex].code);
        }
        break;
      case "Tab":
        setOpen(false);
        setFocusedIndex(-1);
        break;
      default:
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={labelId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={`${t("language.select")}: ${currentLocale?.nativeLabel ?? locale.toUpperCase()}`}
        onClick={() => {
          setOpen((prev) => !prev);
          if (!open) {
            setFocusedIndex(LOCALES.findIndex((l) => l.code === locale));
          }
        }}
        onKeyDown={handleTriggerKeyDown}
        className="flex items-center gap-1.5 rounded-full border border-primary/15 bg-oatmeal/60 px-3 py-2 text-sm font-medium text-primary transition-colors hover:border-primary/30 hover:bg-oatmeal focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline">{locale.toUpperCase()}</span>
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={labelId}
          aria-activedescendant={
            focusedIndex >= 0 ? `${listboxId}-option-${focusedIndex}` : undefined
          }
          onKeyDown={handleListKeyDown}
          className="absolute right-0 top-full z-50 mt-2 min-w-[11rem] overflow-hidden rounded-xl border border-primary/10 bg-oatmeal py-1 shadow-lg shadow-primary/10"
        >
          {LOCALES.map((lang, index) => {
            const isSelected = lang.code === locale;
            const isFocused = index === focusedIndex;

            return (
              <li
                key={lang.code}
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={isSelected}
                className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors ${
                  isFocused || isSelected
                    ? "bg-primary/10 text-primary"
                    : "text-primary/80 hover:bg-primary/5"
                }`}
                onMouseEnter={() => setFocusedIndex(index)}
                onClick={() => selectLocale(lang.code)}
              >
                <span lang={lang.code}>{lang.nativeLabel}</span>
                {isSelected && (
                  <Check className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

