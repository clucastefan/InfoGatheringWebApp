import subprocess
import sys
import re

REGEX_IP = "^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$"
REGEX_DNS = "^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$"

user_input = sys.argv[1]
comanda_verificare_folder = "ls SCANS/" + user_input
comanda_creare_folder = "mkdir SCANS; mkdir SCANS/" + user_input
comanda_nikto = "nikto -h " + user_input + " > SCANS/" + user_input + "/nikto_simplu"
comanda_nikto_ssl = "nikto -h " + user_input + " -ssl > SCANS/" + user_input + "/nikto_ssl"
comanda_raport_nikto = "./nikto_bash/raport_nikto.sh " + user_input
sterge_fisiere = "rm -rf SCANS/" + user_input + "/nikto_simplu; rm -rf SCANS/" + user_input + "/nikto_ssl"


def verificare_input(input):
    pattern_ip = re.compile(REGEX_IP)
    pattern_dns = re.compile(REGEX_DNS)
    if pattern_ip.search(input):
        print('Scanare nikto pentru ' + input)
    elif pattern_dns.search(input):
        print('Scanare nikto pentru ' + input)
    else:
        raise Exception("Adresa trebuie sa fie de tipul IPv4 sau DNS")


def verificare_folder():
    check = subprocess.run(comanda_verificare_folder, shell=True, stderr=subprocess.DEVNULL, stdout=subprocess.DEVNULL)
    if check.returncode != 0:
        subprocess.run(comanda_creare_folder, shell=True, stderr=subprocess.DEVNULL)


def scan_nikto():
    print("Start nikto scan")
    try:
        nikto = subprocess.run(comanda_nikto, shell=True)
        if nikto.returncode == 0:
            print("Scanare nikto terminata")
            print("Se verifica SSL")
            nikto_ssl = subprocess.run(comanda_nikto_ssl, shell=True)
            if nikto_ssl.returncode == 0:
                print("Scanare nikto ssl terminata")
    except:
        raise Exception("Eroare la scanarea cu nikto asupra serverului")


def raport_nikto():
    print("Se creeaza raportul nikto")
    raport = subprocess.run(comanda_raport_nikto, shell=True)
    if raport.returncode != 0:
        raise Exception("A aparut o eroare la livrarea raportului.")
    subprocess.run(sterge_fisiere, shell=True)
    print("\nRaportul nikto este gata\n")


verificare_input(user_input)
verificare_folder()
scan_nikto()
raport_nikto()

