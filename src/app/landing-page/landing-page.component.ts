import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  
  cards = [
    { title: 'Desenv. de sistemas', subtitle: 'Criamos sistemas informatizados, programando e desenvolvendo softwares sob medida', content: 'Content for Card 1', icon: 'fa-tv' },
    { title: 'Desenv. de apps', subtitle: 'Conectamos e criamos a experiência ideal entre seu negócio e os usuários. Tudo de forma simples e criativa em IOS, Android.', content: 'Content for Card 2', icon: 'fa-mobile' },
    { title: 'Dashboard & BIs', subtitle: 'Visualize os processos do seu negócio, de forma dinâmica e objetiva. Um painel lúdico para sintetizar as informações.', content: 'Content for Card 3', icon: 'fa-table' },
    { title: 'Design session', subtitle: 'Para inovar e criar soluções digitais, utilizamos a metodologia para resolver problemas e alinhar rapidamente as equipes.', content: 'Content for Card 4', icon: 'fa-object-group' },
    { title: 'UX – user experience', subtitle: 'Desenhamos os protótipos de alta fidelidade, considerando a experiência do usuário, usabilidade, tipografia, cores e formas.', content: 'Content for Card 5', icon: 'fa-pager' },
    { title: 'Computação em Nuvem', subtitle: 'Simples, escalável e eficiente. Nossa Computação em Nuvem oferece acesso instantâneo a recursos essenciais.', content: 'Content for Card 6', icon: 'fa-sitemap' },
    // Adicione mais cards conforme necessário
  ];

  activeGroupIndex = 0;
  cardsPerGroup = 3;
  totalGroups = Math.ceil(this.cards.length / this.cardsPerGroup);

  getGroupIndices() {
    return Array.from({ length: this.totalGroups }, (_, i) => i);
  }

  getCardsInGroup(groupIndex: number) {
    const startIndex = groupIndex * this.cardsPerGroup;
    const endIndex = startIndex + this.cardsPerGroup;
    return this.cards.slice(startIndex, endIndex);
  }

  prevGroup() {
    this.activeGroupIndex = (this.activeGroupIndex - 1 + this.totalGroups) % this.totalGroups;
    this.addSlideLeftClass();
    setTimeout(() => {
      this.removeSlideClass();
    }, 800);
  }

  nextGroup() {
    this.activeGroupIndex = (this.activeGroupIndex + 1) % this.totalGroups;
    this.addSlideRightClass();
    setTimeout(() => {
      this.removeSlideClass();
    }, 800);
  }

  addSlideLeftClass() {
    const carouselInner = document.querySelector('.carousel-inner');
    if (carouselInner) {
      carouselInner.classList.add('slide-left');
    }
  }

  addSlideRightClass() {
    const carouselInner = document.querySelector('.carousel-inner');
    if (carouselInner) {
      carouselInner.classList.add('slide-right');
    }
  }

  removeSlideClass() {
    const carouselInner = document.querySelector('.carousel-inner');
    if (carouselInner) {
      carouselInner.classList.remove('slide-left', 'slide-right');
    }
  }

  goToGroup(groupIndex: number) {
    this.activeGroupIndex = groupIndex;
  }


  // Validação formulario

  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // Inicialize o formulário com validações
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern("^\\d{1,15}$")]],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Faça algo com os dados do formulário, por exemplo, enviar para um servidor
      console.log(this.contactForm.value);
  
      // Exibir o SweetAlert2 após o envio bem-sucedido
      Swal.fire({
        icon: 'success',
        title: 'Mensagem enviada!',
        text: 'Agradecemos por entrar em contato.',
      });
  
      // Limpar o formulário após o envio bem-sucedido (opcional)
      this.contactForm.reset();
    } else {
      // Exibir um alerta se o formulário não for válido (opcional)
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Por favor, preencha todos os campos corretamente.',
      });
    }
  }

  get nameControl() {
    return this.contactForm.get('name');
  }

  get emailControl() {
    return this.contactForm.get('email');
  }

  get phoneNumberControl() {
    return this.contactForm.get('phoneNumber');
  } 

  get messageControl() {
    return this.contactForm.get('message');
  }
}
