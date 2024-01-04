import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-technical-details-table',
  templateUrl: './technical-details-table.component.html',
  styleUrls: ['./technical-details-table.component.scss'],
})
export class TechnicalDetailsTableComponent {
  @Output() dictionaryChangedEvent = new EventEmitter<{ [key: string]: string }[] | undefined>();
  dictionary: Map<string, string> = new Map();
  dictionaryArray!: { key: string; value: string }[]; // { key: 'PLACEHOLDER', value: 'PLACEHOLDER' };
  updatingKey: string = '';

  ngOnInit() {
    this.dictionary.set('Placeholder', 'Placeholder');
    this.refreshDictionaryArray();
  }

  refreshDictionaryArray() {
    this.dictionaryArray = Array.from(this.dictionary.entries()).map(([key, value]) => ({ key, value }));
  }

  onRowEditSave(product: { key: string; value: string }) {
    // Update the value for the existing key
    if (this.updatingKey) {
      this.dictionary.delete(this.updatingKey);
    }
    this.dictionary.set(product.key, product.value);
    this.refreshDictionaryArray();

    console.log(this.dictionaryArray);
    //sends changes to parent
    this.dictionaryChangedEvent.emit(this.dictionaryArray);
  }

  addNewDetail() {
    // Add a new entry with a unique key (e.g., using a timestamp) to avoid conflicts
    const uniqueKey = `NEW_KEY_${Date.now()}`;
    this.dictionary.set(uniqueKey, 'NEW_VALUE');
    this.refreshDictionaryArray();
  }

  onRowEditInit(product: { key: string; value: string }) {
    this.updatingKey = product.key;
  }
  onRowEditCancel(product: { key: string; value: string }) {
    this.updatingKey = '';
  }
}
