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

# Scan web
comanda_scan_nikto = "python3 nikto.py " + user_input
comanda_scan_dirb = "python3 dirb.py " + user_input
comanda_scan_zap = "python3 zap.py " + user_input

# Raport server-side
comanda_raport_server = "./rapoarte_bash/raport_server.sh " + user_input

# Raport web
comanda_raport_web = "./rapoarte_bash/raport_web.sh " + user_input

# Raport full
comanda_raport_full = "./rapoarte_bash/raport_full.sh " + user_input

# Stergere fisiere scanari
comanda_sterge_nmap = "rm -rf SCANS/" + user_input + "/raport_nmap"
comanda_sterge_hydra = "rm -rf SCANS/" + user_input + "/raport_hydra"
comanda_sterge_shareEnum = "rm -rf SCANS/" + user_input + "/raport_shareEnum"

comanda_sterge_nikto = "rm -rf SCANS/" + user_input + "/raport_nikto"
comanda_sterge_dirb = "rm -rf SCANS/" + user_input + "/raport_dirb"
comanda_sterge_zap = "rm -rf SCANS/" + user_input + "/raport_zap"

comanda_sterge_server = "rm -rf SCANS/" + user_input + "/raport_server"
comanda_sterge_web = "rm -rf SCANS/" + user_input + "/raport_web"
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


def scan_server():
    print("Se incepe scanarea serverului " + user_input + "\n")
    nmap = subprocess.run(comanda_scan_nmap, shell=True)
    hydra = subprocess.run(comanda_scan_hydra, shell=True)
    share = subprocess.run(comanda_scan_share, shell=True)
    if nmap.returncode == 0 and hydra.returncode == 0 and share.returncode == 0:
        print("--Scanare server terminata--" + "\n")
        raport_server = subprocess.run(comanda_raport_server, shell=True)
        if raport_server.returncode == 0:
            print("----Raport server-side finalizat----\n")
            subprocess.run(comanda_sterge_nmap, shell=True)
            subprocess.run(comanda_sterge_hydra, shell=True)
            subprocess.run(comanda_sterge_shareEnum, shell=True)
    else:
        raise Exception("Eroare la scanarea serverului")


def scan_web():
    print("Se incepe scanarea website-ului " + user_input + "\n")
    nikto = subprocess.run(comanda_scan_nikto, shell=True)
    dirb = subprocess.run(comanda_scan_dirb, shell=True)
    zap = subprocess.run(comanda_scan_zap, shell=True)
    if nikto.returncode == 0 and dirb.returncode == 0 and zap.returncode == 0:
        print("--Scanare website terminata--" + "\n")
        raport_server = subprocess.run(comanda_raport_web, shell=True)
        if raport_server.returncode == 0:
            print("----Raport website finalizat----\n")
            subprocess.run(comanda_sterge_nikto, shell=True)
            subprocess.run(comanda_sterge_dirb, shell=True)
            subprocess.run(comanda_sterge_zap, shell=True)
    else:
        raise Exception("Eroare la scanarea website-ului")


def raport_full():
    subprocess.run(comanda_raport_full, shell=True)
    print("\nRaportul pentru " + user_input + " a fost finalizat.")
    print("\nAcesta se gaseste in SCANS/" + user_input + "/raport_full")
    subprocess.run(comanda_sterge_server, shell=True)
    subprocess.run(comanda_sterge_web, shell=True)
    subprocess.run(comanda_sterge_xml, shell=True)


verificare_input(user_input)
scan_server()
scan_web()
raport_full()