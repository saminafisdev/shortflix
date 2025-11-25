import django_filters
from .models import Short

class ShortFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(field_name='title', lookup_expr='icontains')
    description = django_filters.CharFilter(field_name='description', lookup_expr='icontains')
    tag = django_filters.CharFilter(field_name='tags__name', lookup_expr='icontains')

    class Meta:
        model = Short
        fields = ['title', 'description', 'tag']
