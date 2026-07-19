from pathlib import Path
import yaml

BASE_DIR = Path(__file__).resolve().parents[2]

CONFIG_DIR = BASE_DIR / "config"


def load_yaml(filename: str):
    """
    Load a YAML configuration file.
    """
    with open(CONFIG_DIR / filename, "r") as file:
        return yaml.safe_load(file)