import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, FlatList } from 'react-native';

const window = Dimensions.get('window');
const width = window.width;
const height = window.height;

export default class Post extends Component {
    render() {
        return (
            <View>
                {/* Se quisermos utilizar mais de uma propriedade definida em um stylesheet podemos passar um array de estilos:
                    style={ [styles.foo, styles.bar] }

                    Caso seja inline, basta passar um objeto:
                    style={ {foo:20, bar:30} }
                */}
                <View style={styles.header}>
                    <Image style={styles.headerImage} source={{ uri: 'https://instagram.fcgh9-1.fna.fbcdn.net/vp/6170cb0de16a8ec01b9760e19a69b600/5B2B15DA/t51.2885-19/10518184_411719108989377_1218968099_a.jpg' }} />
                    <Text> {this.props.foto.username}</Text>
                </View>
                <Image style={styles.photo} source={{ uri: this.props.foto.url }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: { margin: 10, flexDirection: 'row', alignItems: 'center' },
    headerImage: { width: 30, height: 30, borderRadius: 20 },
    photo: { width: width, height: height }
});