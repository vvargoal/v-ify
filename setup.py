"""v-ify package configuration."""

from setuptools import setup

setup(
    name='v-ify',
    version='0.1.0',
    packages=['app'],
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
