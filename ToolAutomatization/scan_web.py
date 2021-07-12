import subprocess
import sys
import re

REGEX_IP = "^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$"
REGEX_DNS = "^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$"

user_input = sys.argv[1]
comanda_verificare_folder = "ls SCANS/" + user_input

# Scan web
comanda_scan_nikto = "python3 nikto.py " + user_input
comanda_scan_dirb = "python3 dirb.py " + user_input
comanda_scan_zap = "python3 zap.py " + user_input

# Raport web
comanda_raport_web = "./rapoarte_bash/raport_web.sh " + user_input

# Stergere fisiere scanari
comanda_sterge_nikto = "rm -rf SCANS/" + user_input + "/raport_nikto"
comanda_sterge_dirb = "rm -rf SCANS/" + user_input + "/raport_dirb"
comanda_sterge_zap = "rm -rf SCANS/" + user_input + "/raport_zap"

comanda_sterge_xml = "rm -rf SCANS/" + user_input + "/zap_scan.xml"


def verificare_input(input):
    pattern_ip = re.compile(REGEX_IP)
    pattern_dns = re.compile(REGEX_DNS)
    if pattern_ip.search(input):
        print('Scanare completa inceputa ( web + server ) ' + input + "\n")
    elif pattern_dns.search(input):
        print('Scanare completa inceputa ( web + server ) ' + input + "\n")
    else:
        raise Exception("Adresa trebuie sa fie de tipul IPv4 sau DNS")


def scan_web():
    print("Se incepe scanarea website-ului " + user_input + "\n")
    nikto = subprocess.run(comanda_scan_nikto, shell=True)
    dirb = subprocess.run(comanda_scan_dirb, shell=True)
    zap = subprocess.run(comanda_scan_zap, shell=True)
    if nikto.returncode == 0 and dirb.returncode == 0 and zap.returncode == 0:
        print("--Scanare website terminata--" + "\n")
        raport_server = subprocess.run(comanda_raport_web, shell=True)
        if raport_server.returncode == 0:
            print("\nRaportul pentru " + user_input + " a fost finalizat.")
            print("\nAcesta se gaseste in SCANS/" + user_input + "/raport_web")
            subprocess.run(comanda_sterge_nikto, shell=True)
            subprocess.run(comanda_sterge_dirb, shell=True)
            subprocess.run(comanda_sterge_zap, shell=True)
    else:
        raise Exception("Eroare la scanarea website-ului")


verificare_input(user_input)
scan_web()
