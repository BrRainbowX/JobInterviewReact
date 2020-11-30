# MVISIA JOB INTERVIEW
Eu utilizei React JS para criar o sistema.
## Primeiro
```
npm install
```

depois

```
npm start
```

ou

```
npm run build
```

```
serve -s build
```
Caso não tenha o serve: npm i serve
## Estrutura do banco de dados
O banco de dados é um array multidimensional. E ele é salvo em estado e também em LocalStorage.
```
Database = [
    {
        database_name: NOME DO BANCO,
        photos: [
            {
                photo: BASE64 DA IMAGEM
            }
        ]
    }
]
```

## Abaixo irei explicar os blocos na tela

## Canto esquerdo

Select: Seleciona os bancos criados.

Caixa de texto: Nome do banco de dados.

Botão 'Create DB': Cria o banco de dados com o nome escrito acima.

Botão 'Delete this DB': Delete o banco que está selecionado. O banco selecionado está no select que fica acima da caixa de texto.

Botão 'Delete all DBs': Deleta todos os bancos de dados.

Botão 'Download this DB': Faz o download apenas do banco selecionado.
```
Apenas um banco é baixado!
    {
        database_name: NOME DO BANCO,
        photos: [
            {
                photo: BASE64 DA IMAGEM
            }
        ]
    }
```

Botão 'Download all DBs': Faz o download de todos os bancos.
```
Todos os bancos são baixados!
Database = [
    {
        database_name: NOME DO BANCO,
        photos: [
            {
                photo: BASE64 DA IMAGEM
            }
        ]
    }
]
```

Botão 'Restore one DB': Faz o upload apenas de um banco. (Arquivo gerado pelo botão 'Download this DB).

Botão 'Restore full DBs': Faz o upload de todos os bancos. (Arquivo gerado pelo botão 'Download all DB).

## Centro

Botão 'Upload image': Faz upload de MULTIPLAS imagens para o banco selecionado no select no canto esquero.

Caixa de preview do crop: Depois do zoom pode mover a imagem

Slider: Controla a quantidade de zoom.

Botão 'Crop & Save': Depois de aplicar o zoom e arrastar a imagem, você pode cortar e salvar ela. Ela fica salva no banco de dados.

Botão 'Download': Baixa a imagem selecionada.(Caso não tenha imagem selecionada, selecione no canto direito).

Botão 'Download all images': Baixa todos as imagens separadamente do banco de dados selecionado.

## Canto direito

Contém blocos de imagens com botões.

Botão 'Lixeira': Deleta a imagem do bloco.

Botão 'Baixar': Faz o download da imagem do bloco.

Botão 'Lixeira': Seleciona para 'CROP' a imagem do bloco. A imagem irá aparecer no centro da tela.
### Informações adicionais
```
Node -v: v12.18.1

Npm -v: 6.14.5
```