import { Component } from '@angular/core';
import { Todo, TodoService } from '../../app/services/todo/todo';
import { ToastController, AlertController, Loading, LoadingController, IonicPage, NavController, NavParams, App } from 'ionic-angular';

/**
 * Generated class for the Tab1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab1',
  templateUrl: 'tab1.html',
})
export class Tab1Page {
  loader: Loading;
  todos: Todo[];

  constructor(
    private todoService: TodoService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public app:App
    ) {
  }

  ngOnInit() {
    this.initLoader();
    this.loadTodos();
  }

  showInputAlert() {
    let prompt = this.alertCtrl.create({
      title: 'Adicionar novos itens',
      message: "Adicionar novas tarefas para nossa lista",
      inputs: [{ name: 'title', placeholder: 'Escreva aqui'}],
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Adicionar',
          handler: data => {
            this.todoService.add(data.title, data.content).subscribe(
              response => {
                if(data.title == "" || data.title == null){
                  return;
                }
                let todo: Todo = {
                  name: data.title,
                  done: false,
                  content: data.content
                };
                this.todos.unshift(todo)
              }
            );
          }
        }
      ]
    });
    prompt.present();
  }
  deleteAction(){
    this.todos = this.todos.filter((todo: Todo) => !todo.done);
    this.todoService.saveAll(this.todos).subscribe(
      done => {
        this.presentToast(
          "Os itens foram deletados"
        )
      } 
    );
  }
  canDelete(): boolean {
      return !!this.todos && !!this.todos.find(todo => todo.done)
  }
  canEdit():boolean{
    return!!this.todos && this.todos.filter((todo: Todo) => todo.done).length == 1
  }
  updateItemState(evt:any, todo: Todo) {
    if (evt) {
      let index: number = this.todos.indexOf(todo);

      if (~index) {
        if (todo.done == true) {
          todo = this.todos[index]
          this.todos.splice(index, 1);
          this.todos.push(todo)
        }
        this.todoService.saveAll(this.todos).subscribe(
          done => {
            this.presentToast(
              "O item foi " + (todo.done ? "marcado" : "desmarcado")
            )
          }
        );
      }
      
    }
  }

  private presentToast(message: string) {
    this.toastCtrl.create({message: message, duration: 2000}).present();
  }

  private initLoader() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando itens"
    });
  }

  private loadTodos() {
    this.loader.present().then(() => {
      this.todoService.fetch().subscribe(
        data => {
          this.todos = data;
          this.loader.dismiss();
        }
      );
    })
  }
  showEditAlert() {
    let prompt = this.alertCtrl.create({
      title: 'Editar item atual',
      message: "Editar tarefa(s) marcada(s)",
      inputs: [{ name: 'title', placeholder: 'Escreva aqui' }],
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Concluir',
          handler: data => {
            if(data.title == "" || data.title == null){
              return;
            }
            this.todos = this.todos.filter((todo: Todo) => !todo.done);
            this.todoService.saveAll(this.todos)
            this.todoService.add(data.title, "").subscribe(
              response => {
                let todo: Todo = {
                  name: data.title,
                  done: false,
                  content: data.content

                };
                this.todos.unshift(todo)
              }
            );
          }
        }
      ]
    });
    prompt.present();
  }
  logout(){
    // Remove API token 
    const root = this.app.getRootNav();
    root.popToRoot();
  }
}
