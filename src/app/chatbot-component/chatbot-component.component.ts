import { Component, HostListener, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-chatbot-component',
  templateUrl: './chatbot-component.component.html',
  styleUrls: ['./chatbot-component.component.css']
})
export class ChatbotComponentComponent {
  prompt: string = '';
  response: string = '';
  isChatOpen: boolean = false;
  messages: { text: string, isUser: boolean }[] = [];

  private isDragging = false;
  private offsetX: number = 0;
  private offsetY: number = 0;

  constructor(private chatService: RestService) {}

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendPrompt() {
    if (this.prompt.trim() !== '') {
      this.messages.push({ text: this.prompt, isUser: true });
      this.chatService.getResponse(this.prompt).subscribe(
        res => {
          console.log("res is: ",res);
          
          this.messages.push({ text: res, isUser: false });
          this.prompt = '';
        },
        err => console.error(err)
      );
    }
  }

  startDrag(event: MouseEvent) {
    this.isDragging = true;
    this.offsetX = event.clientX - (event.target as HTMLElement).getBoundingClientRect().left;
    this.offsetY = event.clientY - (event.target as HTMLElement).getBoundingClientRect().top;
  }

  stopDrag() {
    this.isDragging = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const chatbotIcon = document.querySelector('.chatbot-icon') as HTMLElement;
      chatbotIcon.style.left = `${event.clientX - this.offsetX}px`;
      chatbotIcon.style.top = `${event.clientY - this.offsetY}px`;
    }
  }
}


