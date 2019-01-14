"""vstats package configuration."""

from setuptools import setup

setup(
    name='vstats',
    version='0.1.0',
    packages=['vstats'],
    include_package_data=True,
    install_requires=[
        'django',
        'html5validator',
        'pycodestyle',
        'pydocstyle',
        'pylint',
        'nodeenv',
        'sh',
        'selenium',
        'requests',
        'arrow',
    ],
)
