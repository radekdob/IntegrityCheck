# IntegrityCheckSPA

Do prawidłowego działania niezbędne jest równoczesne uruchomienie aplikacji serwerowej:

oraz zainstalowane następujące programy: 

1. NodeJS.
2. Przeglądarka Firefox (lub inna, która umożliwia zaufanie certyfikatowi wystawionemu z localhosta, Chrome blokuje)

Instrukacja uruchomienia:


W przypadku, gdy chcemy uruchomić sklonowaną aplikacje z repozytorium (czyli nie zbudowaną z flagą --prod):
1. W katalogu głownym aplikacji uruchomić terminal
2. Poprzez komendę "HTTPS=true npm start" uruchomić serwer deweloperski
3. Uruchomić odpowiednią przeglądarkę i przejść pod adres: https://localhost:3000

W przypadku aplikacji zbudowanej: 
1. Zainstalować serwer https https://www.npmjs.com/package/https-localhost
2. Uruchomić terminal w folderze "IntegrityCheckProd" i zastosować komendę "serve"
3. Aplikacji będzie uruchomiona pod adresem https://localhost:443
4. Otworzyć aplikację przez przeglądarka Firefox i zaufać certyfikatowi.
