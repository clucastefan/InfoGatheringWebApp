import subprocess
import sys
import re
import xml.etree.ElementTree as ET

REGEX_IP = "^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$"
REGEX_DNS = "^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$"
LIST_PASSWORD = "~/Documents/SecLists/Passwords/Common-Credentials/10-million-password-list-top-100.txt"
LIST_USERNAME = "~/Documents/SecLists/Usernames/top-usernames-shortlist.txt"

user_input = sys.argv[1]
comanda_verificare_folder = "ls SCANS/" + user_input
comanda_creare_folder = "mkdir SCANS; mkdir SCANS/" + user_input

path = "~/.ZAP/plugin/ZAP_2.10.0_Linux/ZAP_2.10.0/zap.sh "
zap = "-cmd -quickurl http://" + user_input + "/dvwa -quickprogress -quickout ~/Documents/Licenta/ToolAutomatization/SCANS/" + user_input + "/zap_scan.xml"
comanda_zap = path + zap
xmlfile = "SCANS/" + user_input + "/zap_scan.xml"
comanda_raport = "./zap_bash/raport_zap.sh " + user_input
sterge_fisiere = "rm -rf SCANS/" + user_input + "/zap_scan_1.txt; rm -rf SCANS/" + user_input + "/zap_scan_2.txt"


def verificare_input(input):
    pattern_ip = re.compile(REGEX_IP)
    pattern_dns = re.compile(REGEX_DNS)
    if pattern_ip.search(input):
        print('Test web pentru http://' + input)
    elif pattern_dns.search(input):
        print('Test web pentru http://' + input)
    else:
        raise Exception("Adresa trebuie sa fie de tipul IPv4 sau DNS")


def verificare_folder():
    check = subprocess.run(comanda_verificare_folder, shell=True, stderr=subprocess.DEVNULL, stdout=subprocess.DEVNULL)
    if check.returncode != 0:
        subprocess.run(comanda_creare_folder, shell=True, stderr=subprocess.DEVNULL)


def scan_zap():
    print("Se incepe scanarea cu Zed Attack Proxy")
    try:
        zap_scan = subprocess.run(comanda_zap, shell=True, stdout=subprocess.DEVNULL)
        if zap_scan.returncode == 0:
            print("Scanarea pentru vulnerabilitati web terminata")
    except:
        raise Exception("A aparut o eroare la scanarea vulnerabilitatilor web")


def prel_xml_long(xmlf):
    try:
        fisier = open("SCANS/" + user_input + "/zap_scan_2.txt", "w")
        print("Se prelucreaza fisierul XML")
        tree = ET.parse(xmlf)
        root = tree.getroot()
        for elm in root.findall(".//"):
            info = "[" + elm.tag + "]" + " " + str(elm.text)
            print(info, file=fisier)
        fisier.close()
    except:
        raise Exception("A aparut o exceptie la parsarea fisierului xml.")


def prel_xml_short(xmlf):
    try:
        fisier = open("SCANS/" + user_input + "/zap_scan_1.txt", "w")
        tree = ET.parse(xmlf)
        root = tree.getroot()
        vulnids = {}
        for site in tree.findall('site'):
            sitename = site.attrib['name']
            if sitename.find('http://192.168.254.136') != -1:
                for alert in site.findall('.//alertitem'):
                    id = '{}, RISK {}, Nr. aparitii {}, Ref'.format(alert.find('name').text,
                                                                    alert.find('riskdesc').text,
                                                                    alert.find('count').text)
                    sites = vulnids.get(id, str(alert.find('riskcode').text))
                    vulnids[id] = sites
        vulnids_sorted = sorted(vulnids.items(), key=lambda x: x[1], reverse=True)
        for key in vulnids_sorted:
            print(key[0], key[1], file=fisier)
        fisier.close()
    except:
        raise Exception("A aparut o exceptie la parsarea fisierului xml.")


def raport_zap():
    print("Se pregateste raportul testelor web ")
    try:
        raport = subprocess.run(comanda_raport, shell=True)
        if raport.returncode == 0:
            print("Raport livrat.")
    except:
        raise Exception("A aparut o eroare la livrarea raportului.")


verificare_input(user_input)
verificare_folder()
scan_zap()
prel_xml_short(xmlfile)
prel_xml_long(xmlfile)
raport_zap()
subprocess.run(sterge_fisiere, shell=True)
