import subprocess
import sys
import re

REGEX_IP = "^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$"
REGEX_DNS = "^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$"

user_input = sys.argv[1]
comanda_verificare_folder = "ls SCANS/" + user_input

# Scan server-side
comanda_scan_nmap = "python3 nmap.py " + user_input
comanda_scan_hydra = "python3 hydra.py " + user_input
comanda_scan_share = "python3 shareEnum.py " + user_input

# Raport server-side
comanda_raport_server = "./rapoarte_bash/raport_server.sh " + user_input

# Stergere fisiere scanari
comanda_sterge_nmap = "rm -rf SCANS/" + user_input + "/raport_nmap"
comanda_sterge_hydra = "rm -rf SCANS/" + user_input + "/raport_hydra"
comanda_sterge_shareEnum = "rm -rf SCANS/" + user_input + "/raport_shareEnum"


def verificare_input(input):
    pattern_ip = re.compile(REGEX_IP)
    pattern_dns = re.compile(REGEX_DNS)
    if pattern_ip.search(input):
        print('Scanare completa inceputa ( web + server ) ' + input + "\n")
    elif pattern_dns.search(input):
        print('Scanare completa inceputa ( web + server ) ' + input + "\n")
    else:
        raise Exception("Adresa trebuie sa fie de tipul IPv4 sau DNS")


def scan_server():
    print("Se incepe scanarea serverului " + user_input + "\n")
    nmap = subprocess.run(comanda_scan_nmap, shell=True)
    hydra = subprocess.run(comanda_scan_hydra, shell=True)
    share = subprocess.run(comanda_scan_share, shell=True)
    if nmap.returncode == 0 and hydra.returncode == 0 and share.returncode == 0:
        print("--Scanare server terminata--" + "\n")
        raport_server = subprocess.run(comanda_raport_server, shell=True)
        if raport_server.returncode == 0:
            print("\nRaportul pentru " + user_input + " a fost finalizat.")
            print("\nAcesta se gaseste in SCANS/" + user_input + "/raport_server")
            subprocess.run(comanda_sterge_nmap, shell=True)
            subprocess.run(comanda_sterge_hydra, shell=True)
            subprocess.run(comanda_sterge_shareEnum, shell=True)
    else:
        raise Exception("Eroare la scanarea serverului")


verificare_input(user_input)
scan_server()
