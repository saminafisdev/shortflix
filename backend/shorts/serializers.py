from rest_framework import serializers
from .models import Short, Comment, Like, Tag

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class ShortSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(
        child=serializers.CharField(max_length=50),
        write_only=True,
        required=False
    )
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Short
        fields = ['id', 'title', 'description', 'video_file', 'thumbnail', 'views', 'created_at', 'updated_at', 'user', 'tags']
        read_only_fields = ['views', 'created_at', 'updated_at', 'user']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['tags'] = [tag.name for tag in instance.tags.all()]
        return representation

    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        user = self.context['request'].user
        short = Short.objects.create(user=user, **validated_data)
        
        for tag_name in tags_data:
            tag, created = Tag.objects.get_or_create(name=tag_name)
            short.tags.add(tag)
            
        return short

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'

