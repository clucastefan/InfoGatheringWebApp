import subprocess
import sys
import re

REGEX_IP = "^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$"
REGEX_DNS = "^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$"

user_input = sys.argv[1]
comanda_verificare_folder = "ls SCANS/" + user_input
comanda_creare_folder = "mkdir SCANS; mkdir SCANS/" + user_input
comanda_enum = "timeout 180s perl /opt/enum4linux/enum4linux.pl " + user_input + " > SCANS/" + user_input + "/share_enum"
comanda_verificare_enum = "./share_bash/share_verificare.sh " + user_input + " | wc -l"
comanda_raport_false = "./share_bash/raport_enum_null.sh " + user_input


def verificare_input(input):
    pattern_ip = re.compile(REGEX_IP)
    pattern_dns = re.compile(REGEX_DNS)
    if pattern_ip.search(input):
        print('Scanare pentru foldere Samba ' + input)
    elif pattern_dns.search(input):
        print('Scanare pentru foldere Samba ' + input)
    else:
        raise Exception("Adresa trebuie sa fie de tipul IPv4 sau DNS")


def verificare_folder():
    check = subprocess.run(comanda_verificare_folder, shell=True, stderr=subprocess.DEVNULL, stdout=subprocess.DEVNULL)
    if check.returncode != 0:
        subprocess.run(comanda_creare_folder, shell=True, stderr=subprocess.DEVNULL)


def scanare_samba():
    try:
        scan_samba = subprocess.run(comanda_enum, shell=True, timeout=180)
        if scan_samba.returncode == 0:
            print("Scanare samba terminata")
    except subprocess.TimeoutExpired:
        print("Scanare samba terminata")
        return


def verificare_enum():
    verificare = subprocess.check_output(comanda_verificare_enum, shell=True).strip()
    verificare2 = subprocess.run(comanda_verificare_enum, shell=True,stdout=subprocess.DEVNULL)
    if verificare2.returncode == 0:
        if verificare.decode() == "2":
            print("Nu se poate face conexiunea cu " + user_input + " sau serverul nu contine samba shares")
            return False
        else:
            print("Se pregateste raportul enumerarii samba")
            return True
    else:
        raise Exception("A aparut o eroare in timpul scanarii samba")


def prel_folders():
    print("TODO share_folders.sh")


def prel_nbstat():
    print("TODO share_nbstat.sh")


def prel_pass():
    print("TODO share_pass.sh")


def prel_users():
    print("TODO share_users.sh")


# verificare_input(user_input)
# verificare_folder()
# scanare_samba()
if verificare_enum():
    print("Raport finalizat")
    # prel_users()
    # prel_nbstat()
    # prel_folders()
    # prel_pass()
    # raport_enum()
else:
    print("Raport finalizat")
    subprocess.run(comanda_raport_false,shell=True)

