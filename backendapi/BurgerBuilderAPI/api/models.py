from django.db import models
# from django_mysql.models import JSONField

class Ingredients(models.Model):
    salad = models.IntegerField(blank=False)
    bacon = models.IntegerField(blank=False)
    cheese = models.IntegerField(blank=False)
    meat = models.IntegerField(blank=False)

def ingredients_default():
    return {"salad": 0, "bacon": 0, "cheese": 0, "meat": 0,}

# contact_info = JSONField("ContactInfo", default=contact_default)

class Order(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    salad = models.IntegerField(blank=False)
    bacon = models.IntegerField(blank=False)
    cheese = models.IntegerField(blank=False)
    meat = models.IntegerField(blank=False)
    name = models.CharField(max_length=50, blank=True)
    street = models.CharField(max_length=50, blank=False)
    zipCode = models.CharField(max_length=50)
    country = models.CharField(max_length=50, blank=False)
    email = models.CharField(max_length=50, blank=False)
    deliveryMethod = models.CharField(max_length=50, blank=True)

class Ingredient(models.Model):
    name = models.CharField(max_length=30)
    amount = models.IntegerField(blank=False)

    def __str__ (self):
        return self.name



