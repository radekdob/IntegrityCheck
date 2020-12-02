# IntegrityCheckFrontend

Do prawidłowego działania niezbędne jest równoczesne uruchomienie aplikacji serwerowej:

oraz zainstalowane następujące programy: 

1. NodeJS.
2. Przeglądarka Firefox (lub inna, która umożliwia zaufanie certyfikatowi wystawionemu z localhosta, Chrome blokuje)

Instrukacja uruchomienia:

Uruchomić aplikację serwerową: https://github.com/radekdob/IntegrityCheckBackend

W przypadku aplikacji zbudowanej (zalecane): 
1. Zainstalować serwer https https://www.npmjs.com/package/https-localhost - komenda "npm i -g --only=prod https-localhost"
2. Uruchomić terminal w folderze "IntegrityCheckProd" i zastosować komendę "serve" - możliwe komunikaty o zaufaniu wygenerowanemu certyfikatowi
3. Otworzyć przeglądarkę i wejść na stronę https://localhost:8443/auth/ (adres aplikacji backendowej) i wpisać dane do logowania (ten krok jest konieczny, aby firefox zaufał certyfikatowi aplikacji serwerowej) - jest to jednorazowa czynność, w późniejszych uruchomieniach jest zbędna.
4. Otworzyć aplikację kliencką przez przeglądarkę Firefox https://localhost:443/ i zaufać certyfikatowi.

W przypadku, gdy chcemy uruchomić sklonowaną aplikacje z repozytorium (czyli nie zbudowaną z flagą --prod):
1. W katalogu głownym aplikacji uruchomić terminal
2. Poprzez komendę "HTTPS=true npm start" uruchomić serwer deweloperski
3. Otworzyć przeglądarkę i wejść na stronę https://localhost:8443/auth/ (adres aplikacji backendowej) i wpisać dane do logowania (ten krok jest konieczny, aby firefox zaufał      certyfikatowi aplikacji serwerowej) - jest to jednorazowa czynność, w późniejszych uruchomieniach jest zbędna.
4. Uruchomić odpowiednią przeglądarkę i przejść pod adres: https://localhost:3000 i zaufać certyfikatowi.

Jeśli, któryś z kroków nie został wykonany poprawnie to podczas logowania otrzymamy komunikat "Błąd połączenia, Spróbuj ponownie.", a w konsoli deweloperskiej "GET https://localhost:8443/auth/ net::ERR_CERT_AUTHORITY_INVALID".
