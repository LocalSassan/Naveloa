NAVELOA + SUPABASE

1. In Supabase SQL Editor: Inhalt von admin_security.sql einmal ausführen.
2. Lade danach ALLE Dateien dieses Ordners in das Hauptverzeichnis deines GitHub-Repositorys.
3. Commit + Push origin.
4. GitHub Pages aktualisiert die Seite automatisch.

Wichtig:
- naveloa-auth.js enthält nur Project URL + Publishable Key. Diese Werte sind für Browser-Apps vorgesehen.
- Niemals Database Password, Secret Key oder service_role Key in GitHub hochladen.
- Admin ist nicht bei der Registrierung auswählbar.
- admin.html prüft die Rolle über Supabase, bevor Daten geladen werden.
- Wenn Supabase E-Mail-Bestätigung aktiviert hat, müssen neue Nutzer ihre E-Mail zuerst bestätigen.
