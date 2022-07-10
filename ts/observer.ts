interface Observer {
    update(subject: Subject): void;
}

interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(): void;
}

class Lead {
    constructor(public name: string, public phone: string) {
    }
}

class NewLead implements Subject {
    private observers: Observer[] = [];
    public state: Lead | undefined;

    attach(observer: Observer): void {
        if (this.observers.includes(observer)) return;
        console.log(`----------------------`)
        console.log(`Observers before attach`, this.observers)
        this.observers.push(observer);
        console.log(`New observer attached!`, observer)
        console.log(`Observers after attach`, this.observers)
    }

    detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) return;
        console.log(`----------------------`)
        console.log(`Observers before detach`, this.observers)
        this.observers.splice(observerIndex, 1)
        console.log(`observer detached!`, observer)
        console.log(`Observers after detach`, this.observers)
    }

    notify(): void {
        for (const observer of this.observers) {
            observer.update(this)
        }
    }
}

class NotificationService implements Observer {
    update(subject: Subject): void {
        console.log(`----------------------`)
        console.log(`NotificationService update ${subject}`)
    }
}

class LeadService implements Observer {
    update(subject: Subject): void {
        console.log(`----------------------`)
        console.log(`LeadService update ${subject}`)
    }
}

// RUNTIME
const subject = new NewLead();
subject.state = new Lead('Sanchez', '474747');
const service1 = new LeadService();
const service2 = new NotificationService();

subject.attach(service1)
subject.notify()
subject.attach(service2)
subject.notify()
subject.detach(service1)
subject.notify()
subject.detach(service2)
subject.notify()
