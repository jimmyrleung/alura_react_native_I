import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, FlatList, TouchableOpacity } from 'react-native';

const window = Dimensions.get('window');
const width = window.width;
//const height = window.height;

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foto: this.props.foto
        };
    };

    carregaIcone(isLiked) {
        return isLiked ? require('../assets/img/s2-checked.png') : require('../assets/img/s2.png');
    };

    like() {
        // como queremos alterar só uma propriedade, utilizamos o spread operator pra replicar as demais
        this.setState({ foto: { ...this.state.foto, isLiked: !this.state.foto.isLiked } });
    }

    getNumberOfLikes(likers) {
        if (likers.length === 0) return "";
        if (likers.length === 1) return `1 like`;
        return `${likers.length} likes`;
    }

    render() {
        // Extrair a propriedade foto do estado
        const { foto } = this.state;
        console.warn(foto);
        return (
            <View>
                {/* Se quisermos utilizar mais de uma propriedade definida em um stylesheet podemos passar um array de estilos:
                    style={ [styles.foo, styles.bar] }

                    Caso seja inline, basta passar um objeto:
                    style={ {foo:20, bar:30} }
                */}
                <View style={styles.header}>
                    <Image style={styles.headerImage} source={{ uri: 'https://instagram.fcgh9-1.fna.fbcdn.net/vp/6170cb0de16a8ec01b9760e19a69b600/5B2B15DA/t51.2885-19/10518184_411719108989377_1218968099_a.jpg' }} />
                    <Text> {foto.username}</Text>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Image style={styles.photo} source={{ uri: foto.url }} />
                </View>
                {/* <Image style={styles.photo} source={require('../assets/img/iaintzelda.jpg')} /> */}
                <View style={styles.footer}>
                    <TouchableOpacity onPress={this.like.bind(this)}>
                        <Image style={styles.likeButton} source={this.carregaIcone(foto.isLiked)} />
                    </TouchableOpacity>
                    <Text>{this.getNumberOfLikes(foto.likers)}</Text>
                    <View style={styles.fotoDescription}><Text style={styles.fotoUser}>{foto.username}</Text><Text>{foto.description}</Text></View>
                    {/* {foto.comments.map(comment => {
                        return <View style={styles.comment}><Text style={styles.commentUserName}>{`${comment.username} `}</Text><Text>{comment.text}</Text></View>;
                    })} */}
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    header: { margin: 5, flexDirection: 'row', alignItems: 'center' },
    headerImage: { width: 30, height: 30, borderRadius: 20 },
    photo: { width: width, height: 300 },
    likeButton: { height: 30, width: 30 },
    footer: { margin: 10 },
    fotoDescription: { flexDirection: 'row', alignItems: 'center' },
    fotoUser: { fontWeight: 'bold', marginRight: 5 }
});