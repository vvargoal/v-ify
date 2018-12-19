from django.db import models


class Team(models.Model):
    team_name = models.CharField(max_length=64)
    add_date = models.DateTimeField('date added')

    def __str__(self):
        return self.team_name


class Game(models.Model):
    home_team = models.ForeignKey(
        Team, on_delete=models.CASCADE, related_name='home')
    away_team = models.ForeignKey(
        Team, on_delete=models.CASCADE, related_name='away')
    neutral_site = models.BooleanField()
    game_date = models.DateTimeField('date played')

    def __str__(self):
        return f"{self.home_team} vs {self.away_team}"
