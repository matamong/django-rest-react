import urllib.request
import json


class DataDragon():

    # https://stackoverflow.com/questions/12965203/how-to-get-json-from-webpage-into-python-script
    def get_champions(self):
        # http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/champion.json
        with urllib.request.urlopen('http://ddragon.leagueoflegends.com/cdn/' + self.get_latest_version() + '/data/en_US/champion.json') as url:
            data = json.loads(url.read().decode())
            return data['data']

    def get_champion_by_key(self, chamion_key):
        champions = self.get_champions()
        path_values = self.getpath(champions, str(chamion_key))
        return champions[path_values[0]]

    # https://stackoverflow.com/questions/22162321/search-for-a-value-in-a-nested-dictionary-python
    def getpath(self, nested_dict, main_champion_key):
        reverse_linked_q = list()
        reverse_linked_q.append((list(), nested_dict))

        while reverse_linked_q:
            this_key_chain, this_v = reverse_linked_q.pop()
            # finish search if found the mime type
            if this_v == main_champion_key:
                return this_key_chain
            # not found. keep searching
            # queue dicts for checking / ignore anything that's not a dict
            try:
                items = this_v.items()
            except AttributeError:
                continue  # this was not a nested dict. ignore it
            for k, v in items:
                reverse_linked_q.append((this_key_chain + [k], v))
            # if we haven't returned by this point, we've exhausted all the contents
        raise KeyError

    def get_latest_version(self):
        # https://ddragon.leagueoflegends.com/api/versions.json
        with urllib.request.urlopen('https://ddragon.leagueoflegends.com/api/versions.json') as url:
            data = json.loads(url.read().decode())
            return data[0]
